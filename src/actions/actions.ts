"use server"
import prisma from "@/lib/db"
import { sleep } from "@/lib/utils"
import { revalidatePath } from "next/cache"


  //only servers run it
export async function addPat(formData){    
    // console.log(formData)
    await sleep(2000)

    try{
        await prisma.pat.create({
            data:{
                name : formData.get("name"),
                ownerName : formData.get("ownerName"),
                imageUrl : formData.get("imageUrl") || "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
                age : parseInt(formData.get("age")) ,
                notes : formData.get("notes")
            }
        })
        revalidatePath("/app",'layout') // to re render the changed list of pats
    }
    catch(err){
        return {
            message : "Could not add patient. Please try again later"
        }
    }

}


export async function editPat(patId:string,formData){

  try{
      await sleep(2000)

      await prisma.pat.update({
          where:{id:patId},
          data:{
              name : formData.get("name"),
              ownerName : formData.get("ownerName"),
              imageUrl : formData.get("imageUrl") || "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
              age : parseInt(formData.get("age")) ,
              notes : formData.get("notes")
            }
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
    await sleep(2000)

    try{
        await prisma.pat.delete({where:{id:patId}})
        }

    catch(err){
        return {
            message : "Could not edit patient. Please try again later"
        }
    } 

  revalidatePath("/app",'layout')
}