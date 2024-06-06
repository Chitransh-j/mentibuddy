import { Logo } from '@/components/logo'
import React from 'react'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex flex-col gap-y-3 justify-center items-center min-h-screen'>
    <Logo className='w-24 h-24'/>
 
    {children}
    </div>
  )
}
