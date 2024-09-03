'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { redirect } from "next/navigation";
import db from "../db";




export default async function CreateCommunity(prevState:any,formData : FormData) {
  const session = await getServerSession(authOptions);

  if(!session?.user){
    return redirect('/auth/sigin')
  }

  try {
    const name = formData.get('name') as string;
  
   const data = await db.subreddit.create({
    data:{
      name:name,
      userId:session?.user.id
    }
   })
   return {
    message : 'The Community is Created succesfully',
    status : 'green'
   }
  } catch (error) {
    console.log(error);
    return{
      message:'the Community is already exist in Database',
      status:'error'
    }
    
  }
}
