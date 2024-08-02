import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
      <div className='text-white flex justify-between border-b border-slate-500 px-4 py-2 items-center'>
          <div>
          <Link href="/">Auca Library</Link>
          <ul></ul>
          </div>
          <Link href="api/auth/signout" className="bg-red-600 px-4 py-2 rounded-md hover:cursor-pointer hover:bg-red-800">Logout</Link>
    </div>
  )
}

export default Navbar