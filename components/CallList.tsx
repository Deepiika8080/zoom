// @ts-nocheck
"use client"
import { useGetCalls } from '@/hooks/useGetCalls'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import MeetingCard from './MeetingCard'
import Loader from './Loader'
import {  useToast } from './ui/use-toast'

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
    const {toast} = useToast();
    const router = useRouter();
    const { endedcalls, upcomingcalls, callRecordings, isloading } = useGetCalls();
    // console.log("recordings",callRecordings)
    //  console.log("endedcalls",endedcalls);
    const [recordings, setRecordings] = useState<CallRecording[]>([])

    
    useEffect(() => {       
        const fetchRecordings = async () => {
            try {
                if (callRecordings.length === 0) return;
                const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()))
    
                const recordings = callData
                    .filter(call => call.recordings.length > 0)
                    .flatMap(call => call.recordings)
                // console.log("recordings :)",recordings[0].start_time)
                setRecordings(recordings);
            }catch(e) {
                toast({title: 'Try again later!!'})
            }     
        }
        if(type === 'recordings') {
            fetchRecordings();
        }      
     }, [type,callRecordings,toast])
     

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedcalls;
            case 'upcoming':
                return upcomingcalls;//recordings
            case 'recordings':
                return recordings;
            default:
                return [];
        }
    }
    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'NO Previous calls';
            case 'upcoming':
                return 'No upcoming calls';//recordings
            case 'recordings':
                return 'No Recordings';
            default:
                return '';
        }
    }

    if(isloading)  return <Loader/>

    const calls = getCalls();
    const getnocallmessages = getNoCallsMessage();    

  
    const formatdate = (meeting) => {
        // console.log("meeting",meeting);
        const date = meeting.state?.startsAt || meeting.start_time;
        // console.log("meeting.state?.startsAt",meeting.state?.startsAt);
        // console.log("meeting.state?.start_time",meeting.start_time);
        if (!date) {
            return 'Date not available';
        }
        const dateObj = new Date(date);
    
        // Formatting date to show only the date part
        const datePart = dateObj.toLocaleDateString();
    
        // Formatting time to show only hours and minutes
        const timePart = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
           
        // Combining both parts
        return `${datePart}, ${timePart}`;
    };
    return (  
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-5'>
                {calls && calls.length>0 ? calls.map((meeting : Call | CallRecording) => (
                    
                   <MeetingCard 
                   key={(meeting as Call).id}
                   title={(meeting as Call).state?.custom?.description?.substring(0,26) || meeting?.filename?.substring(0,20) || 'Personal Meeting'}
                   date={formatdate(meeting)}
                   icon={
                    type === 'ended'
                     ? '/icons/previous.svg' 
                     : type === 'upcoming' 
                     ? '/icons/upcoming.svg'
                     : '/icons/recordings.svg'
                   }
                   isPreviousMeeting={type === 'ended'}
                   buttonIcon1={type === 'recordings' ? '/icons/play.svg': undefined}
                   buttonText={ type === 'recordings' ? "Play":"Start"}
                   handleClick={type === 'recordings' ? () => router.push(`${meeting.url}`) : () => router.push(`/meeting/${meeting.id}`)}
                   link={ type === 'recordings' ? meeting.url: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
                   />
                )):(
                <h1>{getnocallmessages}</h1>
                )}
        </div>
        
    )
}

export default CallList


