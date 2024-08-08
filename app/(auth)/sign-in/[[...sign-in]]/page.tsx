import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SigninPage = () => {
  return (
    <main className='flex-center w-full h-screen'>
        <SignIn  fallbackRedirectUrl="http://localhost:3000" />
    </main>
  )
}

export default SigninPage