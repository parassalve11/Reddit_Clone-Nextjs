'use client'
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button"; 
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export  function SaveButton({title}:{title:string}) {
    const router = useRouter();
    const{pending} = useFormStatus();
    return(
      <>
      {pending ? (
        <Button disabled size={'sm'} type='submit' className='font-semibold mt-2 w-full'
        >  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
           {title} 
          </Button>
       
      ):(
        <Button  type='submit' size={'sm'} className='font-semibold mt-2 w-full'
        >{title}
        </Button>
      )}
      {pending && router.refresh()}
      </>
    )
  }