"use server"
import { signIn, signOut } from "@/lib/auth"
//only servers run it
import prisma from "@/lib/db"
import { authSchema, patFormSchema } from "@/lib/validations"
import { Pat } from  "@prisma/client"
import { revalidatePath } from "next/cache"
import bcrypt from 'bcryptjs'
import { checkAuth } from "@/lib/server-utils"

// PATIENT ACTION
export async function addPat(pat:unknown){
    
    const session = await checkAuth()

    const validatedpat = patFormSchema.safeParse(pat)

    if(!validatedpat.success) {
        return {
            message : 'Validation error ! Please Check if you are not messing the client side HTML Structure'
        }
    }

    try{ 

        await prisma.pat.create({
            data: {...validatedpat.data,
                user :{
                    connect:{
                        id : session.user.id
                    }
                }
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


export async function editPat(patId:Pat['id'],newpatData:unknown){
    
    //login check
    const session = await checkAuth()

    //validation check
    const validatedpat = patFormSchema.safeParse(newpatData)

    if(!validatedpat.success) {
        return {
            message : 'Validation error ! Please Check if you are not messing the client side HTML Structure'
        }
    }

    //auth verification
    const recpat = await prisma.pat.findUnique({
        where:{
            id:patId,
        }

    })

    if (!recpat){
        return {
            message : "Could not find patient. Please try again later"
        }
    }

    if (recpat.userId !== session.user.id){
        return {message:'You are not allowed to edit this patient'}
    }
    //changing database
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


/////////////////////  CHEKCOUT PAT ACTION        /////////////////////////////
export default async function checkoutPat(patId:Pat['id']){

    //auth check 
    const session = await checkAuth()

    const recPat =await prisma.pat.findUnique({
        where:{
            id:patId
        },
        select:{
            userId:true
        }
    })  

    if (!recPat){
        return {
            message:"Could not find patient. Please try again later"
        }
    }

    if (recPat.userId !== session.user.id){
        return {message:'You are not allowed to delete this patient'}
    }


    //mutation
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


/////////////////////////        LOG IN ACTION                   /////////////

export async function LogIn(formData:unknown){    
    //vdaliate the onbject
    if (!(formData instanceof FormData)){
        return {message:'Invalid Form Data'}
    }

    await signIn('credentials',formData)
}


///////////////LOG OUT ACTION /////////////////////////
export async function LogOut(){
    await signOut({redirectTo:'/'})
}


//////////// sign in action //////////

export async function signUp(formData:unknown){
    
    if (!(formData instanceof FormData)){
        return {message:'Invalid Form Data'}
    }

    const formDataEntires = Object.fromEntries(formData.entries())
    const validatedFormData = authSchema.safeParse(formDataEntires)

    if (!validatedFormData.success){
        return {message:'Invalid Form Data'}
    }
    
    const hashedPassword = await bcrypt.hash(validatedFormData.data.password,10)
    
    const {email,password} = validatedFormData.data

    await prisma.user.create({
        data:{
            email,
            hashedPassword,
        }
    })

    await signIn('credentials',formData)
}