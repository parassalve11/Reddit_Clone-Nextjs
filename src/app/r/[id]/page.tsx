


import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UpdateDiscription from "@/lib/actions/updateDiscription";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { Loader2 } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { SaveButton } from "./_compoents/saveButton";
import SubDiscriptionForm from "@/components/subDiscriptionform";
import { MdCake } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import { IoCreateOutline } from "react-icons/io5";
import CreatePostCard from "@/components/CreatePostCard";


export async function getData(name:string){
    const data = await db.subreddit.findUnique({
        where:{
            name:name
        },
        select:{
            name:true,
            userId:true,
            description:true,
            createdAt:true
        }
    })
    return data;
}


export default async function SubreddietRoute(
    {params}:{params:{id:string}}
) {
   
    const data = await getData(params.id)
    const session = await getServerSession(authOptions);

  return (
    <div className="w-full px-10 lg:px-40 mx-auto flex gap-x-10 ">
        <div className="w-[65%] flex flex-col gap-y-5">
            <CreatePostCard />

        </div>
        <div className="w-[35%]">
            <Card>
                <div className="bg-muted font-semibold p-4">
                    About Community
                </div>
                <div className="p-4">
                    <div className="flex items-center gap-x-3">
                        <Image 
                        src={`https://avatar.vercel.sh/${data?.name}`}
                        alt="Subreddit Image"
                        width={50}
                        height={50}
                        className="w-16 h-16 rounded-full "
                        />
                        <Link href={`/r/${data?.name}`} className="text-sm font-medium hover:underline">
                            <span className="text-xl text-slate-600">r/</span>{data?.name}</Link>
                    </div>
                    {session?.user.id == data?.userId  ?  (
                        
                     <SubDiscriptionForm subName={params.id} description={data?.description} />
                    )
                    :(
                        <p className="text-secondary-foreground text-sm mt-2">
                        {data?.description}
                    </p>
                    )}
                     <div className="flex  gap-x-2 mt-2">
                    
                   
                    <p className="flex items-center gap-x-2 text-muted-foreground text-sm mt-2">
                    <MdCake className="w-5 h-5 text-sm" />
                        Created:{' '}
                   
                        {new Date(data?.createdAt as Date).toLocaleString('en-in',{
                            year:'numeric',
                            weekday:'long',
                            month:'short',
                            day:'numeric',
                            
                        })}
                    </p>
                    
                </div>
                <Separator className="my-5" />
                <div>
                    <Button className="flex items-center gap-x-2 rounded-full w-full font-semibold">
                    <IoCreateOutline className="text-xl font-semibold" />
                        <Link href={session?.user ?  `/r/${data?.name}/create` : '/auth/signin'}
                        >Create Post  </Link>
                        
                    </Button>
                </div>
                </div>
               
            </Card>

        </div>
    </div>
  )
}
