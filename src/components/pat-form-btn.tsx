import React from 'react'
import { Button } from './ui/button'

type PetFormBtnProps = {
  actionType :"add" | "edit"
}

export default function PatFormButton({actionType}: PetFormBtnProps) {
  return (
    <Button  type="submit" className="mt-5 self-end">{actionType==="add" ? "Add New Patient" : "Save Changes"}</Button>

  )
}
