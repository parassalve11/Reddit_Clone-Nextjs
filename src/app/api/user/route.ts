import db from "@/lib/db";
import {  NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { z } from "zod";
import {generateUsername } from "unique-username-generator";

const userSchema = z.object({
    name: z.string()
        .min(2,"more than 2"),
    
        

    email: z.string().email('Check Your Email Again!'),

    password: z.string()
                .min(6,'the password should be more tahn 6 char')
                .max(45,'the password should be less tahn 45 char'),

   
})



export async function POST(req: Request){
    try {

        const body = await req.json();
        //1.extracting email name and password from body

        const{email , name , password  } = userSchema.parse(body);

        //2.checking email is already exists or not
        const existingUserByEmail = await db.user.findUnique({
            where:{
                email:email,
            }
        });
        if(existingUserByEmail) throw NextResponse.json({user:null ,
            message:'User with the Email is Already Exist'},{status:409} )

         //3.save the new User
         const newUser = await db.user.create({
            data:{
                name,
                email,
                password: await bcrypt.hash(password , 10),
                userName: generateUsername('@',3,16,`${`${name} `}`)
            }
         }) 

         const{ password: newUserPassword , ...rest} = newUser;
           
        return NextResponse.json({user: rest , message:'User Created Succesfully!!'},{status:201});
    } catch (error) {
        return NextResponse.json({message:'Something went Wrong!!'},{status:500});
        
        
    }
}