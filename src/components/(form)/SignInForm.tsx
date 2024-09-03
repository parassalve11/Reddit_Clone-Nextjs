'use client'

import React, { useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Link from 'next/link'
import GoogleSignInButton from '../GoogleSignInButton'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useToast } from '../ui/use-toast'
import {generateUsername} from 'unique-username-generator'

const formSchema = z.object({
    email: z.string().email('Check Your Email Again!'),

    password: z.string()
                .min(6,'the password should be more tahn 6 char')
                .max(45,'the password should be less tahn 45 char'),
   
                
})


export default function SignInForm() {
  const[isVisible , setVisible] = useState(false)
    const router = useRouter();
    const {toast} = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      })



    const onSubmit = async(values: z.infer<typeof formSchema>) =>{
        const signInData = await signIn('credentials',{
            email: values.email,
            password: values.password,
          
            redirect: false,
        });
        if(signInData?.error){
          toast({
            title: "ERROR ",
            description: "Something went Wrong!!!",
          })
        }else{
          toast({
            title: "SUCCESS",
            description: "User Signed Successfully!!",
          })
            router.push('/')

        }
        
    }
      
       
    
    

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
      <div className='space-y-2'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='mail@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

       
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
              <div className='flex items-center justify-end'>
              <Input className='relative ' type={isVisible? 'text' : 'password'} placeholder="Enter Your password" {...field}   />
              {isVisible? (<EyeIcon onClick={() => setVisible((prev) => !prev)} size={'5vh'} className='absolute px-2 ' />) 
              :(<EyeOffIcon onClick={() => setVisible((prev) => !prev)} size={'5vh'} className='absolute px-2 ' />) }
              </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button className='w-full mt-6' type='submit'>
        Sign in
      </Button>
    </form>
    <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
      or
    </div>
    <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
    <p className='text-center text-sm text-gray-600 mt-2'>
      If you don&apos;t have an account, please&nbsp;
      <Link className='text-blue-500 hover:underline' href='/auth/signup'>
        Sign up
      </Link>
    </p>
  </Form>
  )

}
