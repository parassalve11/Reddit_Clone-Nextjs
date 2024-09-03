import { User } from "@prisma/client";
import nextAuth from "next-auth";

declare module 'next-auth' {
    interface Session{
        user:User
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
        user:any
    }
}


declare module 'next-auth'{
    interface User{
        name:string
    }
    interface Session{
        user: User &{ 
            name:string 
    }
    token:{
        name:string
    }

    }
}