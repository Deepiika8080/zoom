import React from 'react'
import Image from 'next/image';
import { Button } from './ui/button';
import { avatarImages } from '@/constants';
import { toast, useToast } from './ui/use-toast';
import { cn } from '@/lib/utils';

interface MeetingCardProps {
    title: string,
    date: string,
    icon: string,
    isPreviousMeeting: boolean,
    buttonIcon1: string,
    buttonText: string,
    handleClick: () => void,
    link: string
}

const MeetingCard = ({ title, date, icon, isPreviousMeeting, buttonIcon1, buttonText, handleClick, link }: MeetingCardProps) => {
    return (
        <section className='w-full max-h-[258px] bg-dark-1 flex flex-col justify-between  gap-2 px-5 py-8 rounded-lg '>
            <article className='flex flex-col gap-5'>
                <Image src={icon} width={28} height={28} alt="previousicon" />
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold text-2xl'> {title} </h1>
                        <p className='text-normal text-sm text-slate-300'> {date} </p>
                    </div>
                </div>
            </article>
            <article  className={cn("flex justify-center relative mt-9",{})}>
                <div className='relative flex w-full max-sm:hidden'>
                     {avatarImages.map((img,index) => (
                          <Image src={img} key={index} alt="attendees" className={cn(`rounded-full`,{absolute:
                            index > 0
                         })} 
                         width={40} height={40} 
                         style={{top: 0,left:index * 28}}
                         />
                     ))}
                     <div className='flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4'>
                        +5
                     </div>
                </div>
                {!isPreviousMeeting && (
                        <div className=' flex gap-2'>
                            <Button className='bg-blue-1  text-white mr-2 ' onClick={handleClick}>{buttonIcon1 && (
                                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
                            )} &nbsp; {buttonText} </Button>

                            <Button className='bg-dark-3 text-white'
                                onClick={() => {
                                    navigator.clipboard.writeText(link);
                                    toast({
                                        title: "Link Copied"
                                    });
                                }}>
                                <Image src="/icons/copy.svg" alt="feature" width={20} height={20} />
                                CopyInvitationLink
                            </Button>
                        </div>
                    )
                    }
            </article>           
        </section>
    )
}

export default MeetingCard;