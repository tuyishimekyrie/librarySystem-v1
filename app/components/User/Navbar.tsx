"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

const Navbar = () => {
  const router = useRouter();
  return (
      <div className='text-white flex justify-between border-b border-slate-500 px-4 py-2 items-center'>
          <div className="flex gap-8">
          <Link href="/">Auca Library</Link>
        <ul>
          <span onClick={() => router.push("/books")} className='hover:text-blue-400 hover:cursor-pointer'>Books</span>
          

          </ul>
          </div>
          <Link href="api/auth/signout" className="bg-red-600 px-4 py-2 rounded-md hover:cursor-pointer hover:bg-red-800">Logout</Link>
    </div>
  )
}

export default Navbar