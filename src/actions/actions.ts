"use server"
import prisma from "@/lib/db"
import { PatEssentials } from "@/lib/types"
import { patFormSchema } from "@/lib/validations"
import { Pat } from  "@prisma/client"
import { revalidatePath } from "next/cache"


  //only servers run it
export async function addPat(pat:PatEssentials){
    
    const validatedpat = patFormSchema.safeParse(pat)

    if(!validatedpat.success) {
        return {
            message : 'Validation error ! Please Check if you are not messing the client side HTML Structure'
        }
    }

    try{ 
        await prisma.pat.create({
            data: validatedpat.data
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

    const validatedpat = patFormSchema.safeParse(newpatData)

    if(!validatedpat.success) {
        return {
            message : 'Validation error ! Please Check if you are not messing the client side HTML Structure'
        }
    }

  try{


      await prisma.pat.update({
          where:{id:patId},
          data:validatedpat.data,
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
