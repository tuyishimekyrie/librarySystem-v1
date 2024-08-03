import React from 'react';
import { db } from '@/drizzle/db';
import { book } from '@/drizzle/db/schema';
import BookTable from './BookTable';

const fetchBooks = async () => {
  try {
    const books = await db.select().from(book);
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

const BooksPage = async () => {
    const books = await fetchBooks();

  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4 text-black">Books</h1>
      <BookTable books={books} />
    </div>
  );
};

export default BooksPage;
