'use client'

import UpdateDiscription from "@/lib/actions/updateDiscription"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { SaveButton } from "@/app/r/[id]/_compoents/saveButton"
import { useFormState } from "react-dom"
import { toast, useToast } from "./ui/use-toast"

const initialState ={
    message:'',
    status:''
}

export default function SubDiscriptionForm({subName , description}: {subName:string , description:string |null |undefined} ) {
    const[state , finalAction] = useFormState(UpdateDiscription , initialState);
if(state.status == 'green'){
    toast({
        title:'Sucess',
        description:state.message
    })
}
else if(state.status == 'error'){
    toast({
        title:'Sucess',
        description:state.message,
        variant:'destructive'
    })
}

  return (
    <form action={finalAction} className="mt-3" >
    <Input name="subName" type="hidden"  value={subName}/>
    <Textarea 
    name="description"
    placeholder="Create a custom Description for your Subreddit!!  "
    maxLength={120}
    defaultValue={description ?? undefined}
    />
    {state.status == 'green' && 
    <p className="text-green-500 text-xs">{state.message}</p>
    }
    {state.status == 'error' && 
    <p className="text-destructive text-xs">{state.message}</p>
    }
    <SaveButton title="save" />
</form>
  )
}
