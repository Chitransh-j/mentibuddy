 // by default it is server component becoz this is imported inside a client component 
"use client"

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import PatForm from "./pat-form";
import { useState } from "react";
import { flushSync } from "react-dom";

type PatButtonProps = {
  children: React.ReactNode;
  actionType: "edit" | "checkout" | "add"; 
  onClick?: () => void 
  disabled?: boolean
}

export default function PatButton( {disabled,actionType,onClick,children } : PatButtonProps) {
  const[isformopen, setIsFormOpen] = useState(false)

  if (actionType==='checkout'){
    return <Button onClick={onClick} disabled= {disabled} variant="destructive">{children}</Button>
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

        <PatForm actionType={actionType} onFormSubmission={()=>{ 
            flushSync(() => {
              setIsFormOpen(false)  /// so as react won't batch the multiple udating states to a single update
            })
        }}/>
      </DialogContent>
    </Dialog>
    )
  }
}
