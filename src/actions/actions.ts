"use server"
import { signIn, signOut } from "@/lib/auth"
//only servers run it
import prisma from "@/lib/db"
import { authSchema, patFormSchema } from "@/lib/validations"
import { Pat, Prisma } from  "@prisma/client"
import { revalidatePath } from "next/cache"
import bcrypt from 'bcryptjs'
import { checkAuth } from "@/lib/server-utils"
import { sleep } from "@/lib/utils"
import { AuthError } from "next-auth"
import { CredentialsSignin } from "@auth/core/errors"
import { redirect } from "next/navigation"

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

export async function LogIn(prevState:unknown ,formData:unknown){  
    await sleep(1000)
    //vdaliate the onbject
    if (!(formData instanceof FormData)){
        return {message:'Invalid Form Data'}
    }

    try{
        await signIn('credentials',formData)
    }

    catch(error){

        if (error instanceof AuthError){
            switch(error.type){
                case 'CredentialsSignin':{
                    return {message:'Invalid email or password'}
                }
                default:{
                    return {message:'Could not Sign In. Please try again later'}
                }
            }
        }

        throw error  //nextjs redirects throw so we must rethrow it 
    }
 
}


///////////////                 LOG OUT ACTION                  /////////////////////////
export async function LogOut(){
    await signOut({redirectTo:'/'})
}


//////////// sign in action //////////

export async function signUp(prevState: unknown,formData:unknown){
    
    await sleep(1000)
    if (!(formData instanceof FormData)){
        return {message:'Invalid Form Data'}
        }
        
        const formDataEntires = Object.fromEntries(formData.entries())
        const validatedFormData = authSchema.safeParse(formDataEntires)
        
        if (!validatedFormData.success){
            return {message:'Invalid Form Data'}
            }
            
            const {email,password} = validatedFormData.data
            const hashedPassword = await bcrypt.hash(password,10)
            
            

    try{
        await prisma.user.create({
            data:{
                email,
                hashedPassword,
            }
        })
    }
    catch(error){
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
              return {
                message: "Email already exists.",
              };
            }
          }
      
          return {
            message: "Could not create user.",
          };
        }
        console.log("yes error")

        await signIn("credentials", formData);
    
    
    
    }
