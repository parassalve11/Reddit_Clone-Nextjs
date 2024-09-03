'use client'

import React, { useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Link from 'next/link'
import GoogleSignInButton from '../GoogleSignInButton'
import { useRouter } from 'next/navigation'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useToast } from '../ui/use-toast'


const formSchema = z.object({
    name: z.string()
        .min(2,"more than 2"),
    
        

    email: z.string().email('Check Your Email Again!'),

    password: z.string()
                .min(6,'the password should be more tahn 6 char')
                .max(45,'the password should be less tahn 45 char'),

    confromPassword: z.string()
                .min(6,'the password should be more tahn 6 char')
                .max(45,'the password should be less tahn 45 char')
                
})

.refine((data) => data.password === data.confromPassword , ({
    message:'the password and confrom password is not same',
    path:['confromPassword'],
    
}))


export default function SignUpForm() {

  const[isVisible , setVisible] = useState(false);

    const router = useRouter();
    const {toast} = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email: "",
          password: "",
          confromPassword: "",
        },
      })

     async function onSubmit (values: z.infer<typeof formSchema>) {
        const response = await fetch('/api/user',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },

            body: JSON.stringify({
                name:values.name,
                email:values.email,
                password:values.password
            })
        });

        if(response.ok){
            router.push('/auth/signin')
            toast({
              title: "SUCCESS",
              description: "User saved Successfully!!",
            })
        }else{
          toast({
            title: "ERROR ",
            description: "Something went Wrong!!",
          })
            
        }
        
      }
    

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
      <div className='space-y-3'>
        <FormField
          control={form.control}
          name= "name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
            <Input placeholder="Enter Your Name" {...field} />
              </FormControl>
           
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name= "email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
            <Input placeholder="mail@example.com" {...field} />
              </FormControl>
           
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
         
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl className=''>
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
        <FormField
          control={form.control}
          name="confromPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confrom Password</FormLabel>
              <FormControl>
      
           <Input className='relative' type={isVisible? 'text' : 'password'} placeholder="Re-enter the password" {...field} />
           
              </FormControl>
           
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
       
        <Button className='w-full mt-6' type="submit">
            Sign Up
        </Button>
      </form>

      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <GoogleSignInButton>Sign Up with Google</GoogleSignInButton>
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you  have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/auth/signin'>
          Sign In
        </Link>
      </p>
    </Form>
  )

}
