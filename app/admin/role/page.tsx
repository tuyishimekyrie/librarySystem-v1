import React from 'react';
import { db } from '@/drizzle/db';
import { roles } from '@/drizzle/db/schema';
import RoleTable from './RoleTable';

const fetchRole = async () => {
  try {
    const role = await db.select().from(roles);
    return role;
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
};

const BooksPage = async () => {
    const roles = await fetchRole();
    console.log("roles",roles)

  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4 text-black">Roles</h1>
      <RoleTable role={roles} />
    </div>
  );
};

export default BooksPage;
