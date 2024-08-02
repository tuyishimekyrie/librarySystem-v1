// services/bookService.ts
import { db } from "@/drizzle/db";
import { book } from "@/drizzle/db/schema";
import { eq } from "drizzle-orm";

interface Book {
  id: number;
  title: string | null;
  author: string | null;
  isbn: string | null;
  description: string | null;
  cover: string | null;
  categoryId: string | null; 
}

export const fetchBookById = async (bookid: number): Promise<Book[]> => {
  if (isNaN(bookid)) {
    throw new Error("Invalid book ID");
  }

  const result: Book[] = await db
    .select()
    .from(book)
    .where(eq(book.id, bookid));

  return result;
};
