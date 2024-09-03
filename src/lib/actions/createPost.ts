'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import { redirect } from "next/navigation";
import db from "../db";
import { JSONContent } from "@tiptap/react";

export async function CreatePost({jsonContent}:{jsonContent : JSONContent | null},formData: FormData) {
 const session = await getServerSession(authOptions);
 const user = session?.user;
 if(!user){
    return redirect('/auth/signin')
 }

 const tittle = formData.get('tittle') as string
const imageUrl = formData.get('imageUrl') as string | null;
const subName = formData.get('subName') as string | null;

 await db.post.create({
   data:{
      tittle:tittle,
      imageString:imageUrl,
      subName: subName,
      textContent:jsonContent ?? undefined ,
      userId:user.id
   }
 })

 return redirect('/')
}
