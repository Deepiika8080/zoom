"use client"
import React from 'react'
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';// cn-> classnames and It allows us to add multiple and dynamic classes
import Image from 'next/image';

const Sidebar = () => {
    const pathname = usePathname()
  return (
    <section className='sticky left-0 flex h-screen flex-col w-fit justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
       {/* different meetings */}
        <div className='flex flex-col gap-6'>
        {sidebarLinks.map((link) => { 
            const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

            return (
                <Link href={link.route}
                key={link.label}
                className={cn('flex gap-4 items-center rounded-lg p-4 justify-start',{
                    'bg-blue-1': isActive,
                })}
                >
                   <Image src={link.imgUrl} alt={link.label} width={24} height={24}/>
                   <p className='text-md font-semibold max-lg:hidden'> {link.label} </p>
                </Link>
            )
        })} 
        </div>
    </section>
  )
}

export default Sidebar;