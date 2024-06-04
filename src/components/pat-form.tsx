"use client"

import { usePatContext } from "@/lib/hooks";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { addPat } from "@/actions/actions";
import PatFormButton from "./pat-form-btn";
import { toast } from "sonner";
import { editPat } from "@/actions/actions";

type PatFormProps = {
  actionType: "edit"| "add";
  onFormSubmission : () => void
}

export default function PatForm({ actionType, onFormSubmission } : PatFormProps) {
  const {selectedPat}  = usePatContext()

  return (

    <form action ={ async (formData)=>{
      // console.log(typeof formData)
      if (actionType==='add'){
        const error  =  await addPat(formData)

        if (error){
          toast.warning(error.message)
          return 
        }
        
        onFormSubmission()
      }
      else if (actionType==='edit'){
        const err = await editPat(selectedPat!.id,formData)
      }
  }} 

    className="flex flex-col ">

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

      <PatFormButton actiontype={actionType}/>
    </form>
  )
}
