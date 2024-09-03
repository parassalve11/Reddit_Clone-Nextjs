
import React from 'react'
import { Skeleton } from './ui/skeleton'

export default function Skeletonn() {
  return (
    <div className='w-full flex flex-col gap-y-10 mt-4'>
        <Skeleton className='w-full h-[200px]'/>
        <Skeleton className='w-full h-[200px]'/>
        <Skeleton className='w-full h-[200px]'/>
        <Skeleton className='w-full h-[200px]'/>
      
    </div>
  )
}
