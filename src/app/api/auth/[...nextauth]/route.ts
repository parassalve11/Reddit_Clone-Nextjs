import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth/next";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import {generateUsername} from 'unique-username-generator'

const handler = NextAuth(authOptions);
 

export{handler as GET , handler as POST}