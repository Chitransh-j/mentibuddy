"use client"

import { usePatContext } from "@/lib/hooks";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import PatFormButton from "./pat-form-btn";
import {patFormSchema,TPatForm } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PLACEHOLDER } from "@/lib/constants";


//types
type PatFormProps = {
  actionType: "edit"| "add";
  onFormSubmission : () => void
}



//form validation for both the client and server side 

// our form handler
export default function PatForm({ actionType, onFormSubmission } : PatFormProps) {
  const {selectedPat,handleAddPat,handleEditPat}  = usePatContext()

  const defaultValues = actionType === 'edit' ? {
    name: selectedPat?.name,
    ownerName: selectedPat?.ownerName,
    imageUrl: selectedPat?.imageUrl,
    age: selectedPat?.age,
    notes: selectedPat?.notes,
  } : {};
  
  const { register,getValues,trigger, formState:{errors} } = useForm<TPatForm>({
    resolver : zodResolver(patFormSchema),
    defaultValues
  })

  return (

    <form action ={ 
      
      async (formData)=>{
      
      const res = await trigger()
      if (!res)return

      // this is for closing of the dialog 
      onFormSubmission()  
    
      // this is parsing the form data to the PatEssentials format and passing it to the context provider
      const patData = getValues()
      patData.imageUrl = patData.imageUrl  || DEFAULT_PLACEHOLDER

      if (actionType==='add'){
        await handleAddPat(patData)
      }

      else if (actionType==='edit'){
        await handleEditPat(selectedPat!.id,patData)
      }
  }} 



    className="flex flex-col ">

      <div className="space-y-3">

        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register('name')} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>


        <div className="space-y-1">
          <Label htmlFor="ownerName">Condition (Possible)</Label>
          <Input id="ownerName" {...register('ownerName')}/>
          {errors.ownerName && <p className="text-red-500">{errors.ownerName.message}</p>}
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" {...register('imageUrl')} placeholder="You can leave it empty."/>
          {errors.imageUrl && <p className="text-red-500">{errors.imageUrl.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" {...register('age')}/>
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">About</Label>
          <Textarea id="notes" {...register('notes')}/>
          {errors.notes && <p className="text-red-500">{errors.notes.message}</p>}
        </div>
      </div>

      <PatFormButton actionType={actionType}/>
    </form>
  )
}
