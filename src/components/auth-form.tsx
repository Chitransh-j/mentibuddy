"use client"

import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { LogIn, signUp } from '@/actions/actions'
import AuthFormBtn from './auth-form-btn'
import { useFormState } from 'react-dom'

type  AuthFormProps  = {
  type: 'login' | 'register'
}

export default function Authform( {type} : AuthFormProps) {
  const [signUpError,dispatchSignUp] = useFormState(signUp,undefined)
  const [LogInError,dispatchLogIn] = useFormState(LogIn,undefined)

  return (
    <form action={ type==='login' ? dispatchLogIn : dispatchSignUp} >
        {/* email */}
      <div className='space-y-1'>
        <Label htmlFor='email'>Email</Label>  
        <Input type="email" name='email' id="email" required maxLength={100}/>
      </div>  

      {/* password */}
      <div className='mb-4 mt-2 space-y-1'> 
        <Label htmlFor='password'>Password</Label>
        <Input id='password' name='password' type='password' required maxLength={100}></Input>
      </div>
      {/* Submit */}
      <div className='m-auto'>
        <AuthFormBtn type={type}/>
      </div>
      
      { signUpError &&  <p className='text-red-500 text-sm mt-2'>{signUpError.message} </p>}
      { LogInError &&  <p className='text-red-500 text-sm mt-2'>{LogInError.message} </p>}
    </form>
  )
}
