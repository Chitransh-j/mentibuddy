import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { LogIn, signUp } from '@/actions/actions'

type  AuthFormProps  = {
  type: 'login' | 'register'
}

export default function Authform( {type} : AuthFormProps) {
  return (
    <form action={type==='login' ? LogIn : signUp} >
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
        <Button className=''>
          {type === 'login' ? 'Log In' : 'Sign Up'}
        </Button>
      </div>
    </form>
  )
}
