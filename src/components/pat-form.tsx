"use client"

import { usePatContext } from "@/lib/hooks";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type PatFormProps = {
  actionType: "edit"| "add";
  onFormSubmission : () => void
}

export default function PatForm({ actionType, onFormSubmission } : PatFormProps) {
  const {handleAddPat,selectedPat,handleEditPat}  = usePatContext()

  const handleSubmit= (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget) 
    const pat = { 
      name:formData.get("name") as string,
      ownerName:formData.get("ownerName") as string,
      imageUrl:formData.get("imageUrl") as string|| "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      age: +(formData.get("age") as string),
      notes:formData.get("notes") as string,
    }       // basically yaha se json mil jaayega for the backend 

    if (actionType==='add'){
      handleAddPat(pat)
    }
    //else edit 
    else{
      handleEditPat(selectedPat!.id,pat)// forced typescript
    }

    onFormSubmission() // close the dialog
  }

  return (
    <form action = "" onSubmit={handleSubmit} className="flex flex-col ">

      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" required defaultValue={actionType==="edit" ? selectedPat?.name : ""}/>
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Condition (Possible)</Label>
          <Input id="ownerName" name="ownerName" type="text" required defaultValue={actionType==="edit" ? selectedPat?.ownerName : ""}/>
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" name="imageUrl" type="text" defaultValue={actionType==="edit" ? selectedPat?.imageUrl : ""}/>
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" name="age" type="number" required defaultValue={actionType==="edit" ? selectedPat?.age : ""}/>
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">About</Label>
          <Textarea id="notes" name="notes" required defaultValue={actionType==="edit" ? selectedPat?.notes : ""}/>
        </div>
      </div>

      <Button type="submit" className="mt-5 self-end">{actionType==="add" ? "Add New Patient" : "Save Changes"}</Button>
  
    </form>
  )
}
