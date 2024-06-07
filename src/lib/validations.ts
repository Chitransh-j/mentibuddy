import { z } from "zod";
import allowedLinks from "./allowed_links";
import { DEFAULT_PLACEHOLDER } from "./constants";


export const patFormSchema  = z.object({

    name : z.string().trim().min(1,"Name is Required").max(20,"Name must be less than 20 characters"),
  
    ownerName : z.string().trim().min(1,"Condition is Required").max(30,"Condition must be less than 30 characters"),
  
    imageUrl : z.union([
      z.literal(""),
      z.string().regex(new RegExp(`^https?://(?:www\\.)?(${allowedLinks.join('|')})/`))
    ]),

    age: z.coerce.number().int().positive().min(0,'Enter Valid Age').max(1000,'Enter Valid Age'),
    notes : z.union([z.literal(''),z.string().trim().max(400,"Notes must be less than 400 characters")])
    }).transform(data => ({...data, imageUrl: data.imageUrl || DEFAULT_PLACEHOLDER}))


export type TPatForm = z.infer<typeof patFormSchema>

 


export const authSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100)
})

export type TAuthForm = z.infer<typeof authSchema>