import { authOptions } from '@/lib/auth'
import db from '@/lib/db';
import { getServerSession } from 'next-auth';
import {generateUsername} from 'unique-username-generator'
import { redirect } from 'next/navigation';
import React from 'react'
import SettingsPageForm from '@/components/SettingsPage';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

async  function getData(userId:any) {

  

  const data = await db.user.findFirst({
        where:{
            id:userId,
           
        },
        select:{
            userName:true
        }
    })
    return data;
}

export default async function SettingsPage() {
const session = await getServerSession(authOptions)


if(!session?.user){
  redirect('auth/signin')
}

const data = await getData(session.user.id)
  return (
    <h1 className='w-full px-20 flex flex-col  mx-auto mt-4'>
        <SettingsPageForm userName={data?.userName} />
       
    </h1>
  )
}
