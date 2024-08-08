// "use client";
// import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk';
// import React, { useState, useEffect } from 'react';
// import { Button } from './ui/button';

// interface MeetingSetupProps {
//   onSetupComplete: (value: boolean) => void; // Updated prop name
// }

// const MeetingSetup: React.FC<MeetingSetupProps> = ({ onSetupComplete }) => {
//   const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
//   const call = useCall();

//   if (!call) {
//     throw new Error("useCall must be used within a StreamCall component");
//   }

//   useEffect(() => {
//     if (isMicCamToggledOn) {
//       call?.camera.disable();
//       call?.microphone.disable();
//     } else {
//       call?.camera.enable();
//       call?.microphone.enable();
//     }
//   }, [isMicCamToggledOn, call?.camera, call?.microphone]);

//   return (
//     <div className='w-full h-screen text-white flex flex-col justify-center items-center'>
//       <h1 className='text-2xl font-bold'>Meeting setup</h1>
//       <VideoPreview />
//       <div className='flex flex-col gap-3 justify-center'>
//         <label>
//           <input 
//             type='checkbox'
//             checked={isMicCamToggledOn}
//             onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
//           />
//           Join with mic and camera off
//         </label>
//         <DeviceSettings />
//         <Button 
//           className='rounded-md px-4 bg-green-500 py-2.5'
//           onClick={() => {
//             call.join();
//             onSetupComplete(true); // Updated prop usage
//           }}
//         >
//           Join Meeting
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default MeetingSetup;







"use client"
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React,{useState,useEffect} from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({setissetUpComplete}:{setissetUpComplete:(value:boolean) => void}) => {
  const [isMicCamToggledOn, setisMicCamToggledOn] = useState(false)
  const call = useCall();
  if(!call) {
    throw new Error("use call must be used within streamcall component");
  }
  useEffect(() => {
    if(isMicCamToggledOn) {
      call?.camera.disable()
      call?.microphone.disable()
    }else {
      call?.camera.enable()
      call?.microphone.enable()
    }
  }, [isMicCamToggledOn,call?.camera,call?.microphone])
  
  return (
    <div className='w-full h-screen text-white flex flex-col justify-center items-center '>
          <h1 className='text-2xl font-bold'>Meeting setup</h1>
          <VideoPreview/>
          <div className='flex flex-col gap-3 justify-center'>
              <label>
                <input 
                   type='checkbox'
                   checked={isMicCamToggledOn}
                   onChange={(e) => setisMicCamToggledOn(e.target.checked)}                   
                 />
                 Join with mic and camera off
              </label>
              <DeviceSettings/>
              <Button className='rounded-md px-4 bg-green-500 py-2.5' onClick={() => {call.join()
                      setissetUpComplete(true);
              }}> Join Meeting</Button>
          </div>
    </div>
  )
}

export default MeetingSetup