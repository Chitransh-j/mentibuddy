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
            
            if (isLoggedIn && !istryingoacessapp){
                return Response.redirect(new URL('/app/dashboard', request.url))
            }

            if (!isLoggedIn && !istryingoacessapp){
                return true
            }   
            
            return false
        },
        jwt : ({token,user})=>{
            if (user){
                // on sign in 
                token.userId  = user.id
            }

            return token
        },
        session: ({session,token}) =>{
            if (session.user){
                session.user.id = token.userId
            }

            return session;
        }
    }
} satisfies NextAuthConfig

export const {auth,signIn,signOut} = NextAuth(config)

