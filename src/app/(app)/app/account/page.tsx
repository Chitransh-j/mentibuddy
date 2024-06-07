import ContentBlock from '@/components/content-block'
import H1 from '@/components/h1'
import React from 'react'
import {auth} from '@/lib/auth'
import { redirect } from 'next/navigation'
import Signout from '@/components/sign-out-btn'

const Account =  async () => {
  const session = await auth()

  //althou middleware does the auth check so we double check and satisfy typescript issues 
  if (!session?.user){
    redirect('/login')
  }

  return (
    <main>
      <H1 className="my-6 text-white">My Account </H1>
      <ContentBlock className='h-[400px] flex justify-center items-center flex-col gap-3'>
        <p>Logged in as {session.user.email}</p>

        <Signout/>
      </ContentBlock>
    </main>
  )
}

export default Account
