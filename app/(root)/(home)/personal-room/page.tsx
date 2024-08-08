"use client"
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import {useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react'

const PersonalRoom = () => {
  const router = useRouter()
  const {toast} = useToast();
   const {user} = useUser()
   const meetingId = user?.id;
   const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`

  const Table = ({title,description}: {title:string; description:string;}) => {
    return (
      <div className='flex flex-col gap-2 items-start xl:flex-row'>
      <h1 className='text-base font-medium text-sky-1 lg:text-xl xl:min-w-32'>{title}</h1>
      <h1 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl'>{description}</h1>
    </div>
    )
  }

  const client = useStreamVideoClient();

  const {call} = useGetCallById(meetingId!)

  const startRoom = async () => {
    if(!client || !user) return;
        
        if(!call) {
          const newcall = client.call('default',meetingId!)
          await newcall.getOrCreate({
            data:{
              starts_at: new Date().toISOString(),
            }
          })
        }

        router.push(`/meeting/${meetingId}?personal=true`);
  }
  return (   
    <section className='flex flex-col size-full gap-10 text-white'>
    <h1 className='text-3xl font-bold'>PersonalRoom</h1>
    <div className='flex flex-col gap-8 w-full xl:max-w-[900px]'>
       <Table title="Topic:" description={`${user?.username}'s Meeting Room`}/>
       <Table title="Meeting Id:" description={meetingId!}/>
       <Table title="InviteLink:" description={`${meetingLink}'s Meeting Room`}/>

       <div className='gap-5 '>
              <Button className='bg-blue-1 'onClick={startRoom}> start Meeting</Button>
              <Button className='bg-dark-3 ml-4' onClick={() => {
                navigator.clipboard.writeText(meetingLink);
                toast({
                  title:"Link copied!!"
                })
              }}>Copy Invitation</Button>
       </div>
    </div>
    </section>
  )
}

export default PersonalRoom;