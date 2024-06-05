"use server"
import prisma from "@/lib/db"
import { PatEssentials } from "@/lib/types"
import { Pat } from  "@prisma/client"
import { revalidatePath } from "next/cache"


  //only servers run it
export async function addPat(pat:PatEssentials){
    
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


export async function editPat(patId:Pat['id'],newpatData:PatEssentials){

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

export default async function checkoutPat(patId:Pat['id']){

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