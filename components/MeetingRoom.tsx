import { cn } from '@/lib/utils';
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, 
  SpeakerLayout } from '@stream-io/video-react-sdk';
import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import { useCallStateHooks } from '@stream-io/video-react-sdk';
import Loader from './Loader';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';


interface CallStateHooks {
  useCallCallingState: () => CallingState;

}

const MeetingRoom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callCallingState = useCallCallingState(); 

  const [callingState, setCallingState] = useState<CallingState | null>(null);
  useEffect(() => {
   
      setCallingState(callCallingState);
    
  }, [callCallingState])

  if (callingState === null) {
    return <Loader />;
  }

  if (callingState !== CallingState.JOINED) {
    return <Loader />;
  }

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition="right" />;
      default:
        return <SpeakerLayout participantsBarPosition="left" />;
    }
  };

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[1000px] items-center'>
          <CallLayout />
        </div>
        {/* participants  ${showParticipants ? 'block' : 'hidden'} ml-2`*/}
        <div className={`h-[calc(100vh-86px)]  ml-2 ${showParticipants ? 'block' : 'hidden'}`}>         
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
       
      </div>

      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
        <CallControls onLeave={() => router.push("/")}/>
        <DropdownMenu>
          <div className='flex items-center'>
            <DropdownMenuTrigger className='border-none bg-dark-1 rounded-lg cursor-pointer px-4 py-2 hover:bg-gray-700'>
              <LayoutList className="text-white" size={20} />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className='bg-dark-1 border-dark-1 text-white'>
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem className='cursor-pointer' onClick={() => {
                  setLayout(item.toLowerCase() as CallLayoutType);
                }}>
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className='border-dark-1' />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => 
        setShowParticipants(prev => !prev)}>
            <div className='border-none bg-[#19232d] rounded-full cursor-pointer px-4 py-2 hover:bg-[#4c535b]'>
            <Users size={20} className='text-white' />
            </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;