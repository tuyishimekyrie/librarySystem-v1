import React from 'react'
import UserTable from "@/app/librarian/users/UserTable"
import { db } from '@/drizzle/db';
import { users } from '@/drizzle/db/schema';

const fetchUsers = async () => {
  try {
    const user = await db.select().from(users);
    return user;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
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