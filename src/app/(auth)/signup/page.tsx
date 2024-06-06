import Authform from '@/components/auth-form'
import H1 from '@/components/h1'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <main>
      <H1 className='text-center mb-6'>
       Sign Up 
      </H1>

      <Authform/>

      <p className='mt-6 text-sm text-zinc-500 text-center'>
         Already have an account? {" "}
        <Link href='/login' className='font-medium'>Login</Link>
      </p>
    </main>
  )
}

export default Page
