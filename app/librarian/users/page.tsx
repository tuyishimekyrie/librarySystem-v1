import React from 'react';
import { db } from '@/drizzle/db';
import {  users } from '@/drizzle/db/schema';
import UserTable from "./UserTable"

const fetchUsers = async () => {
  try {
    const user = await db.select().from(users);
    return user;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const BooksPage = async () => {
    const users = await fetchUsers();
    console.log("users",users)

  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4 text-black">users</h1>
      <UserTable users={users} />
    </div>
  );
};

export default BooksPage;
