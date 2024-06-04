"use server"
import prisma from "@/lib/db"
import { Pat } from "@/lib/types"
import { revalidatePath } from "next/cache"


  //only servers run it
export async function addPat(pat:Omit<Pat,'id'>){
    
    // console.log(formData)

    try{ 
        await prisma.pat.create({
            data:pat
        })
        revalidatePath("/app",'layout') // to re render the changed list of pats
    }
    catch(err){
        return {
            message : "Could not add patient. Please try again later"
        }
    }

}


export async function editPat(patId:string,newpatData:Omit<Pat,'id'>){

  try{


      await prisma.pat.update({
          where:{id:patId},
          data:newpatData,
        })    
        revalidatePath("/app",'layout') // to re render the changed list of pats
    }

  catch(err)
  {
    return {
      message : "Could not edit patient. Please try again later"
    }
  }
}

export default async function checkoutPat(patId:string){

    try{
        await prisma.pat.delete({where:{id:patId}})
        revalidatePath("/app",'layout')
        }

    catch(err){
        return {
            message : "Could not edit patient. Please try again later"
        }
    } 

}