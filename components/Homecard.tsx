
"use client"
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';
// interface is type that can be extensible
interface HomeCardsProps {
    className: string,
    img: string,
    title: string,
    description: string,
    handleclick: () => void;
}
const Homecard = ({className,img,title,description,handleclick}:HomeCardsProps) => {
    return (
        <>
            <div className={cn(`px-4 py-6 flex flex-col xl:max-w-[270px] w-full cursor-pointer rounded-[14px] min-h-[260px] justify-between`,className)}
                onClick={handleclick}>
                <div className='flex-center glassmorphism size-12 rounded-xl'>
                    <Image width={27} height={27} src={img} alt='addmeetingIcon' />
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-bold'>{title}</h1>
                    <p className='text-lg font-normal'>{description}</p>
                </div>
            </div>            
        </>
    )
}

export default Homecard;