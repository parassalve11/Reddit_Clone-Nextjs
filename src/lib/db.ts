import { PrismaClient } from "@prisma/client";


const globalForThis = global as unknown as {
     prisma : PrismaClient | undefined
     }

export const db = globalForThis.prisma ?? new PrismaClient();

if(process.env.NODE_ENV !== "production"){
    globalForThis.prisma = db;
}

export default db;