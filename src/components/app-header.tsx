"use client"

import React from 'react'
import { Logo } from './logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const routes = [
    {
        label:"Dashboard",
        path:"/app/dashboard"
    },
    {
        label:"Account",
        path:"/app/account"
    }
] 

export default function AppHeader() {
    const activepathname  = usePathname()
    
    console.log(activepathname)
  return (
    <header className='flex justify-between items center border-b border-white/10 py-2 my-2'>
        <Logo className=''/>
        <nav >
            <ul className='flex gap-2 text-xs'>
                {routes.map(route =>(
                <li key= {route.path}><Link href={route.path} className={cn('text-white/70 rounded-sm px-2 py-1 hover:text-white focus:text-white transition',{
                    "bg-black/10 tex-white" : route.path===activepathname   //this is conditional classing 
                })}> {route.label}</Link> </li>
                
                ))}
            </ul>
        </nav>
    </header>
  )
}
