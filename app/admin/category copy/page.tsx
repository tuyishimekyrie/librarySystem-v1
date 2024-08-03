import React from 'react';
import { db } from '@/drizzle/db';
import CategoryTable from './CategoryTable';
import { categorycateTable } from '@/drizzle/db/schema';

const fetchCategory = async () => {
  try {
    const categories = await db.select().from(categorycateTable);
    return categories;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

const BooksPage = async () => {
    const categories = await fetchCategory();
    console.log("category",categories)

  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4 text-black">Books</h1>
      <CategoryTable category={categories} />
    </div>
  );
};

export default BooksPage;
