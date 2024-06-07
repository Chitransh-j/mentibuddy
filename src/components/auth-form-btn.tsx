"use client"

import React from 'react'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'

export default function AuthFormBtn({type} : {type: 'login' | 'register'}) {

    const {pending} = useFormStatus()
  return (
    <Button className='' disabled={pending}>
          {type === 'login' ? 'Log In' : 'Sign Up'}
    </Button>
  )
}
