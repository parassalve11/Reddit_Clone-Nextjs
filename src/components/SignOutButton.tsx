'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { Button } from "./ui/button"

export default function SignOutButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <button  className="flex w-full items-center text-destructive ">
        <LogOut  className="mr-2 h-4 w-4 text-destructive" /> Sign Out
    </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          
    <Button onClick={() => signOut({callbackUrl: `${window.location.origin}/auth/signin`})} variant={'destructive'}>Continoue</Button>
           
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
