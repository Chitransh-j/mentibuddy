"use client"
import React from 'react'
import { Button } from './ui/button'
import { LogOut } from '@/actions/actions'

export default function Signout() {
  return (
    <Button onClick={async ()=> await LogOut()} >Log out</Button>
  )
}
