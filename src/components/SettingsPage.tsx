'use client'
import React, { useEffect, useState } from 'react'
import { Separator } from './ui/separator'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Link from 'next/link'
import { UpdateUserName } from '@/lib/actions/UpdateUserName'

import SubmitButton from './SubmitButton'
import { useFormState } from 'react-dom'
import { toast } from './ui/use-toast'

const initialState = {
    message:'',
    status:''

}

export default function SettingsPageForm({userName}:{userName:any}) {
const[state , formAction] = useFormState(UpdateUserName , initialState)

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
},[state , toast])
  return (
  <div>
 
     <form  action={formAction}>
        
     <h1 className='text-3xl font-extrabold tracking-tight'>Settings</h1>
      <Separator className='my-4' />
      <Label className='text-lg'>Username</Label>
      <p className='text-xs text-muted-foreground mt-0'>In this Input You can change Your 
         <span className='underline px-1 text-sm font-semibold'>Username</span></p>
        <Input name='username'
        required 
        className='my-2' 
        defaultValue={userName ?? 'undefined'}
        />
        {state.status == 'green' && (
            <p className='text-green-500 my-0 text-xs'>Successfully changed the username.</p>) }
        {state.status == 'error' &&  (
            <p className='text-destructive  text-xs'>Username is already exists in Database!</p>
        )}

         <div className='w-full flex justify-start gap-x-5 mt-5'>
            <Button type='button'  variant={'secondary'} asChild><Link href={'/'}
            >Cancel</Link>
            </Button>
           <SubmitButton name='Change' />
         </div>
     </form>
  </div>
  )
}
