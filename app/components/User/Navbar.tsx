import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
      <div className='text-white flex justify-between border-b border-slate-500'>
          <div>
          <h1>Logos</h1>
          <ul></ul>
          </div>
          <Link href="api/auth/signout">Logout</Link>
    </div>
  )
}

export default Navbar