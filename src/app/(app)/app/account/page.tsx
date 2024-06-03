import ContentBlock from '@/components/content-block'
import H1 from '@/components/h1'
import React from 'react'

const Account = () => {
  return (
    <main>
      <H1 className="my-6 text-white">My Account </H1>

      <ContentBlock className='h-[400px] flex justify-center items-center'>
        <p>Logged in as ...</p>
      </ContentBlock>
    </main>
  )
}

export default Account
