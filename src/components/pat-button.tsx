 // by default it is server component becoz this is imported inside a client component 
"use client"

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import PatForm from "./pat-form";
import { useState } from "react";

type PatButtonProps = {
  children: React.ReactNode;
  actionType: "edit" | "checkout" | "add"; 
  onClick?: () => void 
}

export default function PatButton( {actionType,onClick,children } : PatButtonProps) {
  const[isformopen, setIsFormOpen] = useState(false)

  if (actionType==='checkout'){
    return <Button onClick={onClick} variant="destructive">{children}</Button>
  }

  else{
    return (
    <Dialog open={isformopen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {
          actionType === "add" ? 
          (<Button size='icon'><PlusIcon className="h-6 w-6" /> </Button>) :
          (<Button variant="secondary">{children}</Button>)
        }
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle> {actionType ==='add' ? "Add a new Patient" : "Edit Patient"}</DialogTitle>
        </DialogHeader>

        <PatForm actionType={actionType} onFormSubmission={()=>{ setIsFormOpen(false)}}/>
      </DialogContent>
    </Dialog>
    )
  }
}
