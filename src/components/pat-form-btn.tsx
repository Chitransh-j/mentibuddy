import React from 'react'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'

export default function PatFormButton(actionType) {
    const {pending} = useFormStatus()
  return (
    <Button disabled={pending} type="submit" className="mt-5 self-end">{actionType==="add" ? "Add New Patient" : "Save Changes"}</Button>

  )
}
