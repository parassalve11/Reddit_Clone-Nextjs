'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import { redirect } from "next/navigation";
import db from "../db";


export default async function UpdateDiscription(prevState:any,formData: FormData) {
const session = await getServerSession(authOptions);

if(!session?.user){
  return redirect('/auth/signin')
}

try {
  const subName = formData.get('subName') as string
  const description = formData.get('description') as string
  
  await db.subreddit.updateMany({
    where:{
     name:subName
    },
    data:{
      description:description
    }
  })
      
    return {
      message:'Description is Updated succesfully.',
      status: 'green'
}
} 
catch (error) {
  console.log(error);
  return{
    message:'Something went wrong!',
    status:'error'
  }
  
}
}
