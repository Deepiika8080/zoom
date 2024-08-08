"use client";
import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react';

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const [issetUpComplete, setissetUpComplete] = useState(false);
  const { user, isLoaded } = useUser();
  const { call, iscallLoading } = useGetCallById(id);

  if (!isLoaded || iscallLoading) {
    return <Loader />;
  }

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!issetUpComplete ? (
            <MeetingSetup setissetUpComplete={setissetUpComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;


