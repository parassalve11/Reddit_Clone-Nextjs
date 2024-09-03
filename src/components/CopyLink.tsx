'use client'
import { Share } from 'lucide-react'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'


export default function CopyLink({id}:{id:string}) {



async function CopytoClipBoard() {
 await navigator.clipboard.writeText(`${location.origin}/post/${id}`)
 toast({
  title:'Copied',
  description:''
 })
}

  return (
   <div>
     <Button onClick={CopytoClipBoard} type='button' variant={'secondary'} className='text-muted-foreground flex items-center gap-x-1'>
      <Share className='h-4 w-4' />
        <p>Share</p>
    </Button>
   
   </div>

  )
}
