'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import { redirect } from "next/navigation";
import db from "../db";
import { TypeOfVote } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function HandleVote(formData:FormData) {
  const session = await getServerSession(authOptions);

  const user = session?.user

  if(!user){
    return redirect('auth/signin')
  }

  const postId = formData.get('postId') as string;
  const voteDirection = formData.get('voteDirection') as TypeOfVote;

  //discard the vote when double Clicked and update it
 const vote =  await db.vote.findFirst({
    where:{
        userId:user.id,
        postId:postId
    }
  });

  if(vote){
   if(vote.voteType === voteDirection){
    return await db.vote.delete({
        where:{
            id:vote.id
        }
    });
  return revalidatePath('/')
   }else{
    await db.vote.update({
        where:{
            id:vote.id,
        },
        data:{
            voteType: voteDirection
        }

    });
    return revalidatePath('/')
   }
  }

  //create  the vote
  await db.vote.create({
    data:{
        userId:session.user.id,
        voteType:voteDirection,
        postId:postId,
    }
  });
  return revalidatePath('/')
}
