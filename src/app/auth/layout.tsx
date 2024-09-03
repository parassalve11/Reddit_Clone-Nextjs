import React from 'react'

export default function AuthLayout({children} : {children:React.ReactNode}) {
  return (
    <div className='bg-slate-200 p-10 rounded-lg'>
        {children}
    </div>
  )
}
