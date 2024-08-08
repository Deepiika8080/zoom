import type { Metadata } from "next";
import StreamVideoProvider from '@/providers/StreamClientProvider';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
    title: "YOOM",
    description: "Video Calling App",
    icons: {
      icon:"/icons/logo.svg"
    }
  };

const Rootlayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            <StreamVideoProvider>
                {children}
            </StreamVideoProvider>
        </main>
    )
}

export default Rootlayout;