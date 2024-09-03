'use client'
import { CircleEllipsis, Lock, LogOut, Settings } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CgCommunity } from "react-icons/cg";
import { signOut, useSession } from "next-auth/react";
import SignOutButton from "./SignOutButton";
import { MdOutlinePostAdd } from "react-icons/md";
import { Separator } from "./ui/separator";


export default  function UserButton() {
    const{data:session} = useSession();
  return (
   <div className="px-10 flex items-center gap-2 ">
     <DropdownMenu >
        
        <DropdownMenuTrigger className="relative " asChild>
            
         <div className="flex items-center rounded-full  border-2 px-2 py-1  gap-x-3 shadow-md">
         <CircleEllipsis  className="h-6 w-8 text-slate-500"/>
         <button  className="flex-none rounded-full">
            <Image
              src={session?.user?.image || "/User.png"}
              alt="User profile picture"
              width={30}
              height={30}
              priority
              className="aspect-square rounded-full bg-background object-cover"
            />
           
          </button>
         </div>
          
        </DropdownMenuTrigger>
       
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{session?.user?.name || "User"}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/r/create" className="">
                <CgCommunity className="mr-2 h-5 w-5 " />
                <span className="">Create Community</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="">
              <MdOutlinePostAdd className="mr-2 h-4 w-4  " />
                <span>Create Post</span>
              </Link>
            </DropdownMenuItem>
            <Separator  />
            <DropdownMenuItem asChild>
              <Link href="/settings" className="px-3 text-base">
                <Settings className="mr-2 h-4 w-4 hover:rotate-180 transition-all" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            {/* TODO: Show this only for admins */}
  
           
  
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          
          
          <SignOutButton />
           
          
        </DropdownMenuContent>
      </DropdownMenu>
   </div>
  );
}
