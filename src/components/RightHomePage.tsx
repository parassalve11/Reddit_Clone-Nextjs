import React from 'react'
import { Card } from './ui/card'
import Image from 'next/image'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import Link from 'next/link'


export default function RightHomePage() {
  return (
    <div className=" w-[35%] mt-4 hidden lg:block">
    <Card className="flex flex-col">
      <Image
      src={'/banner1.png'}
      alt="banner"
      width={500}
      height={300}
      className="  object-contain rounded-md"
       />
     <div className="p-2">
     <div className="flex  gap-x-2">
        <Image 
        src={'/hero.png'}
        alt="hero"
        width={40}
        height={200}
        className="object-contain h-50 w-30 -mt-6"
        />
        <h1 className="text-xl font-semibold ">Home</h1>
       </div>
       <p className="text-xs text-muted-foreground pt-2">
        Come here to check it your favorite communities.
       </p>
       <Separator className="my-2" />

       <div className="flex flex-col gap-y-2">
        <Button variant={'secondary'}>
          <Link href={`r/paras/create`}>Create Post</Link>
        </Button>
        <Button>
          <Link href={'r/create'}>Create Community</Link>
        </Button>
       </div>
     </div>
    </Card>
  </div>
  )
}
