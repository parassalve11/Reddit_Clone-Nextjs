'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { redirect } from "next/navigation";
import db from "../db";



export async function UpdateUserName(prevState:any,formData: FormData) {
   try {
     const session = await getServerSession(authOptions);
  
     if(!session?.user){
         return redirect('/auth/signin')
     }
 
     const username =  formData.get('username') as string;
 
     await db.user.updateMany({
         where:{
             id:session?.user.id
         },
         data:{
             userName:username
         }
     })

     return{
        message: "UserName Updated Succesfully!!",
        status:'green'
    }
     

    
   } catch (error) {
   console.log(error);
   return{
     message: "UserName already Exists!!",
        status:'error'
   }
   }
   
}