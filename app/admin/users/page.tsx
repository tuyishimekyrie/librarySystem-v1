import React from 'react'
import UserTable from "@/app/librarian/users/UserTable"
import { fetchUsers } from '@/app/librarian/users/page'

const page = async () => {
    const users = await fetchUsers();
  return (
      <div className='text-black'>
          <h1>Users</h1>
          <UserTable users={users} />
      </div>
  )
}

export default page