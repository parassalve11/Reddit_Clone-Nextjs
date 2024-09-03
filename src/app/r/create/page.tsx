'use client'
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import CreateCommunity from "@/lib/actions/createCommunity";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const initialState = {
  message:'',
  status:''
}

export default function SubReddietPage() {
const[state , formAction] = useFormState(CreateCommunity ,initialState)

useEffect(() =>{
  if(state.status == 'green'){
    toast({
      title:'Sucess',
      description: state.message,

    })
  }
  else if(state.status == 'error'){
    toast({
      title:'Error',
      description: state.message,
      variant:'destructive'
    })
  }
})

  return (
    <div className="w-full px-20  flex flex-col mt-4 ">
        <form action={formAction}>
            <h1 className="text-3xl font-extrabold tracking-tighter">Create Community</h1>
            <Separator className="my-4" />
            <Label className="text-lg">Name</Label>
            <p className="text-xs text-muted-foreground ">Community name including capitalization can not be changed.</p>

            <div className="relative mt-3">
                <p className="absolute left-0  text-muted-foreground w-8 h-full flex items-center justify-center">/r</p>
                <Input name="name" required  className="pl-6" minLength={3} maxLength={21}/>
            </div>  
                {state.status == 'green' && <p className="text-xs text-green-500">{state.message}</p>}
                {state.status == 'error' && <p className="text-xs text-destructive">{state.message}</p>}

            <div className="w-full flex items-center justify-start mt-4 gap-x-5">
            <Button variant={'secondary'} asChild><Link href={'/'}>Cancel</Link></Button>  
           <SubmitButton name="Create" />
            </div>          
        </form>

    </div>
  )
}
