"use client"
import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
  } from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  const StreamVideoProvider = ({children}:{children:ReactNode}) => {
    const [videoclient,setvideoclient] = useState<StreamVideoClient>();
    const {user,isLoaded} = useUser();
    useEffect(() => {
             if(!user || !isLoaded) return;
             if(!apiKey)  throw new Error("STREAM API KEYS ARE REQUIRED:)");

            const client = new StreamVideoClient({
              apiKey,
              user: {
                id:user?.id,
                name:user?.username || user?.id,
                image:user?.imageUrl
              },
             tokenProvider,
            }) 
            setvideoclient(client);
    },[user,isLoaded]);

    if(!videoclient) {
      return <Loader/>
    }
    return (
      <StreamVideo client={videoclient}>
         {children}
      </StreamVideo>
    );
  };

  export default StreamVideoProvider;