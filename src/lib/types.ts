import {Pat} from "@prisma/client"

//always derive the type from the ORM schema 
export type PatEssentials = Omit<Pat,'id' | 'updatedAt' | 'createdAt' | 'userId'> 

