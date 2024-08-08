import MeetingTypeList from '@/components/MeetingTypeList'
import React from 'react'

const Home = () => {
  const dateNow = new Date()

  const time = dateNow.toLocaleTimeString('en-US', {
    hour:'2-digit',
    minute:'2-digit'
  })
  const date = (new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full'
  })).format(dateNow)
  return (
    <section className='flex flex-col size-full gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg-p-11'>
          <h2 className='glassmorphism text-center py-2 rounded font-normal text-base max-w-[270px] mt-8 ml-8'> Upcoming Meeting at 12:30 PM</h2>
          <div className='flex flex-col gap-2 mb-8 ml-8'>            
              <h1 className='text-4xl lg:text-7xl font-extrabold '>
                {time}
              </h1>           
            <p className=' text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList/>
    </section>
  )
}

export default Home;