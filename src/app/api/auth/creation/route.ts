import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import {generateUsername} from 'unique-username-generator'

export async function GET() {
    const session = await getServerSession(authOptions);

    if(!session?.user || session.user == null || !session.user.id){
        throw new Error('Something went worng plase try again!!');

    }

    let dBuser = await db.user.findUnique({
        where:{
            id:session?.user.id
        },
    });
    if(!dBuser){
        dBuser = await db.user.create({
            data:{
                id: session.user.id,
                email: session.user.email ?? '',
                name:session.user.name ?? '',
                image:session.user.name,
                userName:generateUsername('-',3,16)
            }
        })
    }
    return NextResponse.redirect('http://localhost:3000/')
}