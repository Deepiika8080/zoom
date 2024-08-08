"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Homecard from './Homecard'
import Router from 'next/router'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from './ui/input'


const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoinMeeting' | 'isInstantMeeting' | undefined
    >()// <> -> in ts you have define the type of the state

    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    })
    const [callDetails, setcallDetails] = useState<Call>()
    const { toast } = useToast()

    const createMeeting = async () => {
        if (!client || !user) return;

        try {
            if (!values.dateTime) {
                toast({ title: "Please select Date and Time" })
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if (!call) throw new Error("failed to create a call")
            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
            const description = values.description || 'Instant Meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setcallDetails(call);
            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }
            toast({ title: "Meeting Created" })
        } catch (e) {
            console.log("error in creating a call", e);
            toast({ title: "Failed to create meeting" })
        }
    }
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
    return (
        <section className='grid grid-cols-1 gap-5 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4'>
            <Homecard
                img='icons/add-meeting.svg'
                title='New Meeting'
                description='Start an Instant Meeting'
                handleclick={() => setMeetingState('isInstantMeeting')}
                className="bg-orange-1"
            />
            <Homecard
                img='icons/join-meeting.svg'
                title=' Join Meeting'
                description='via invitation link'
                handleclick={() => setMeetingState('isJoinMeeting')}
                className="bg-blue-1"
            />
            <Homecard
                img='icons/schedule.svg'
                title='Schedule Meeting'
                description='Plan your meeting '
                handleclick={() => setMeetingState('isScheduleMeeting')}
                className="bg-purple-1"
            />
            <Homecard
                img='icons/recordings.svg'
                title='view Recordings'
                description='Check out Your Recordings'
                handleclick={() => router.push('/recordings')}
                className="bg-yellow-1"
            />
            {!callDetails ? (<MeetingModal
                isOpen={meetingState === 'isScheduleMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Schedule a Meeting"
                className="text-center"
                buttonText="Create Meeting"
                handleClick={createMeeting}>
                <div className='flex flex-col gap-2.5'>
                    <label className='text-normal text-base leading-[22px]'>Add a description</label>
                    <Textarea className='border-none bg-[#292c38]
                    focus-visible:ring-0
                    focus-visible-ring-offset-0' onChange={(e) => setValues({ ...values, description: e.target.value })} />
                </div>
                <div className='flex flex-col gap-2.5'>
                    <label className='text-normal text-base leading-[22px]'>select Date </label>
                    <DatePicker selected={values.dateTime} onChange={(date) => setValues({ ...values, dateTime: date! })}
                         showTimeSelect
                         timeFormat='HH:mm'
                         timeIntervals={15}
                         timeCaption='time'
                         dateFormat="MMMM d, yyyy h:mm aa"
                         className='w-full bg-dark-2 rounded p-2 focus:outline-none'
                    />
                </div>
            </MeetingModal>) :
                (<MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Meeting Created"
                    className="text-center"
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast({title:'Link copied'})                    
                    }}
                    image="icons/checked.svg"
                    buttonIcon="/icons/copy.svg"
                    buttonText="Copy Meeting Link"
                />)}

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
            <MeetingModal
                isOpen={meetingState === 'isJoinMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Enter the Invitation Link"
                className="text-center"
                buttonText="Join Meeting"
                handleClick={() => {router.push(values.link)}}
            >
               <Input placeholder='meeting link' className='bg-dark-3 focus-visible:ring-0 border-none focus-visible:ring-offset-0'
               onChange={(e) => setValues({...values,link:e.target.value})}/>
            </MeetingModal>
        </section>
    )
}

export default MeetingTypeList;