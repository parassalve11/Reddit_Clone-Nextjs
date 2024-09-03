'use client'
import React from 'react'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'
import { ArrowDown, ArrowUp, Loader2 } from 'lucide-react'


interface Props{
  name:string;
}

export default function SubmitButton({name}:Props) {
    const{pending} = useFormStatus()
  return (
    <div>
         {pending? (
            <Button disabled type='submit' className='font-semibold'
            >  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
               {name}
               </Button>
         ):(
            <Button  type='submit' className='font-semibold'
            >{name}
            </Button>
         )}
    </div>
  )
}


export function UpVote() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant="outline" size="icon" disabled>
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="outline" size="sm" type="submit">
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}
export function DownVote() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant="outline" size="icon" disabled>
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="outline" size="sm" type="submit">
          <ArrowDown className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}

