import NextAuth, { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import prisma from './db'
import bcrypt from 'bcryptjs'

const config = {
    pages:{
        signIn: '/login',
    },
    session:{
        maxAge: 10* 24 * 60 * 60, // 10 day limit else login mangega 
        strategy: 'jwt',
    },
    providers: [
        Credentials({
            async authorize(credentials){
                //runs on login 
                const {email,password} = credentials

                const user = await prisma.user.findUnique({
                    where:{
                        email,
                    }
                });

                if(!user){
                    console.log('No user Found')
                    return null  // there is no user with that email
                }

                const passMatch = await bcrypt.compare(
                    password,
                    user.hashedPassword
                )

                if (!passMatch){
                    console.log('Invalid Credentials')
                    return null
                }

                return user
            }})
    ],
    callbacks:{
        //runs on every request with middleware
        authorized: ({auth,request})=>{
            const isLoggedIn = Boolean(auth?.user) ;
            const istryingoacessapp = request.nextUrl.pathname.includes('/app')
            
            if (!isLoggedIn && istryingoacessapp){
                return false;
            }
            
            if (isLoggedIn && istryingoacessapp){
                return true;
            }
            
            if (!istryingoacessapp){
                return true;
            }

        }
    }
} satisfies NextAuthConfig

export const {auth,signIn} = NextAuth(config)

