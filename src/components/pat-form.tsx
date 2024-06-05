"use client"

import { usePatContext } from "@/lib/hooks";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { addPat } from "@/actions/actions";
import PatFormButton from "./pat-form-btn";
import allowedLinks from "@/lib/allowed_links";

type PatFormProps = {
  actionType: "edit"| "add";
  onFormSubmission : () => void
}



type ValidateType<T extends string> = T extends 'bytegrad.com' | 'images.unsplash.com' ? T : never;



const validateImageUrl = (url: string): string => {
  const allowedDomains = allowedLinks
  const urlPattern = new RegExp(`^https?://(?:www\\.)?(${allowedDomains.join('|')})/`);
  return urlPattern.test(url) ? url : "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";
};



export default function PatForm({ actionType, onFormSubmission } : PatFormProps) {
  const {selectedPat,handleAddPat,handleEditPat}  = usePatContext()

  return (

    <form action ={ async (formData)=>{
      // console.log(typeof formData)
      onFormSubmission()

      const patData ={
        name : formData.get("name") as string,
        ownerName : formData.get("ownerName")as string,
        imageUrl : validateImageUrl(formData.get("imageUrl") as string || ""),
        age : Number(formData.get("age")),
        notes : formData.get("notes") as string
      }

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

      <PatFormButton actionType={actionType}/>
    </form>
  )
}
