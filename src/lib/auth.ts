import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./db";
import * as bcrypt from 'bcrypt'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import {generateUsername} from 'unique-username-generator'

export const authOptions:NextAuthOptions = {
    adapter: PrismaAdapter(db), 
    session:{
        strategy:'jwt'
    },

    pages:{
        signIn:'/auth/signin'
    },
    providers: [

      GoogleProvider({
        clientId:process.env.AUTH_GOOGLE_ID!,
        clientSecret:process.env.AUTH_GOOGLE_SECRET!,
        allowDangerousEmailAccountLinking: true,
    }),



        CredentialsProvider({
          
          name: "Credentials",

          credentials: {
            email: { label: "Email", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
           if(!credentials?.email || !credentials?.password){
            return null;
           }

           const existingUser = await db.user.findUnique({
            where:{
                email: credentials.email,

            }
           });
           if(!existingUser){
            return null;
           }

           //password authentication

           const passwordMatch = await bcrypt.compare(credentials.password 
            , existingUser.password!)

           if(!passwordMatch){
            return null;
           } 

           return{
            id:`${existingUser.id}`,
            name:`${existingUser.name}`,
            email:existingUser.email,
            userName:existingUser.userName,
           }

          }
        })
      ],

      callbacks:{
        async jwt({token , user}){
          if(user){
            return{
              ...token,
              name:user.name
            }
          }
          return token;
        },
        async session({session ,token}){
          return{
            ...session,
            user:{
              ...session.user,
              name: token.name
            }
          }
         
        },
        }
    };
    
      

