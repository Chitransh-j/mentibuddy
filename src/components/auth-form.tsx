import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function Authform() {
  return (
    <form className=''>
        {/* email */}
      <div className='space-y-1'>
        <Label htmlFor='email'>Email</Label> 
        <Input type="email" id="email" />
      </div>  


      {/* password */}
      <div className='mb-4 mt-2 space-y-1'> 
        <Label htmlFor='password'>Password</Label>
        <Input id='password' type='password'></Input>
      </div>

      {/* Submit */}
      <div className='m-auto'>
        <Button className=''>Submit</Button>
      </div>
    </form>
  )
}
