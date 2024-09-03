import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'
import { BookA } from 'lucide-react'
import AuthButton from './AuthButtons'
import Image from 'next/image'
import { ModeToggle } from './ThemeToogle'

export default function Navbar() {
  return (
   <div className=' w-full border-b flex itmes-center px-10 lg:px-14 py-2 justify-between'>
    <Link href={'/'} className='flex items-center gap-x-3'>
    <Image 
    src={'/reddit.png'}
   alt='logo'
  height={50}
  width={50}
    className='h-10 w-fit '
    />
    <Image 
    src={'/Reddit_wordmark.png'}
    alt='nav tittle'
    height={70}
    width={70}
    className='h-9 object-contain hidden lg:block '
    />
    </Link>
   <div className='flex items-center gap-x-3'>
   
   <ModeToggle />
   <AuthButton />
   </div>
   </div>
  )
}
