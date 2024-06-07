import ContentBlock from '@/components/content-block'
import H1 from '@/components/h1'
import React from 'react'
import Signout from '@/components/sign-out-btn'
import { checkAuth } from '@/lib/server-utils'

const Account =  async () => {
  //althou middleware does the auth check so we double check and satisfy typescript issues 
  const session = await checkAuth()

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
