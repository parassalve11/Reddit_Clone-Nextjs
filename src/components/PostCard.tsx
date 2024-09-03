import React from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { ArrowDown, ArrowUp, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { MdOutlineModeComment } from "react-icons/md"; 
import CopyLink from './CopyLink'
import { Input } from './ui/input'
import HandleVote from '@/lib/actions/HandleVote'
import { DownVote, UpVote } from './SubmitButton'
import { RenderTOJson } from './RenderJson'

interface iAppProps {
    title: string,
    jsoncontent: any,
    userName:string,
    imageString: string | null,
    subName:string,
    id :string,
    voteCount:number,
}

export default function PostCard({title , id , jsoncontent , userName , imageString , subName , voteCount}:iAppProps) {
  return (
    <Card className='flex  relative overflow-hidden  mt-5'>
        <div className='flex flex-col items-center  bg-muted  gap-y-5 p-2'>
            <form action={HandleVote}> 
                <Input type='hidden' name='voteDirection' value='UP' />
                <Input type='hidden' name='postId' value={id} />
               <UpVote />
            </form>
            {voteCount}
            <form action={HandleVote}>
                <Input name='voteDirection' type='hidden' value={'DOWN'} />
                <Input type='hidden' name='postId' value={id} />
                <DownVote />
            </form>
        </div>
        <div>
            <div className='flex items-center gap-3 p-3'>
                <Link href={`/r/${subName}`} className='font-semibold'>r/{subName}</Link>
            </div>

            <div className='px-2'>
                <Link href={'/'} className='text-lg font-semibold mt-1'>
                <h1>{title}</h1>
                </Link>
               
            </div>
            <div className='max-h-[300px] overflow-hidden'>
                    {imageString ? 
                        (  <Image src={imageString} 
                            alt='temline' 
                            width={600} 
                            height={300}
                            className='px-7 rounded-md h-full  ' />):(
                                <RenderTOJson data={jsoncontent} />
                            )
                    }
                </div>
              <div className='m-4 '>
                <div className='flex items-center  gap-x-3 '>
                 <Button type='button' variant={'secondary'} size={'icon'} className='flex items-center  gap-x-1 m-1'>
                 <MdOutlineModeComment className='h-5 w-5 text-muted-foreground' />
                 <span className='text-xs text-muted-foreground'>32</span>
                 </Button>
                 <CopyLink id={id} />
                </div>
               
              </div>
        </div>
    </Card>
  )
}
