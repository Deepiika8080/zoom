import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

interface meetingModalTypes {
    isOpen: boolean,
    onClose: () => void,
    buttonText?: string,
    className?: string,
    children?: ReactNode,
    handleClick?: () => void,
    title: string,
    image?: string,
    buttonIcon?: string
}
const MeetingModal = ({ isOpen, onClose, buttonText, className, image, buttonIcon, children, handleClick, title }: meetingModalTypes) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='flex flex-col gap-6 bg-dark-1 px-6 border-none py-9 text-white w-full max-w-[520px]'>
                     <div className='flex flex-col gap-6'>
                        {image && (
                            <div className='flex justify-center'>
                                <Image src={image} width={72} height={72} alt="image"/>
                            </div>
                        )}
                        <h1 className={cn('text-3xl font-bold leading-[42px]',className)}>{title}</h1>
                        {children}
                        <Button className='bg-blue-1 focus-visible:ring-0 focus:visible:ring-offset-0 max-w-full'
                        onClick={handleClick}>
                            {buttonIcon && 
                            <Image src={buttonIcon} alt='buttonicon' width={13} height={13}/>
                            }&nbsp;
                            {buttonText|| 'Schedule Meeting'}</Button>
                     </div>
            </DialogContent>
        </Dialog>

    )
}

export default MeetingModal