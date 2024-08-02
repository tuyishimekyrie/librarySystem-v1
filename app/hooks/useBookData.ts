// hooks/useBookData.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "@/drizzle/db";
import { book } from "@/drizzle/db/schema";
import { eq } from "drizzle-orm";

interface Book {
  id: number;
  title: string | null;
  author: string | null;
  isbn: string | null;
  description: string | null;
  categoryId: string | null; // Add other fields as necessary
}

export const useBookData = () => {
  const router = useRouter();
  const { id } = router.query;
  const bookid = Number(id);

  const [data, setData] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isNaN(bookid)) {
        setError("Invalid book ID provided.");
        setLoading(false);
        return;
      }

      try {
        const result: Book[] = await db
          .select()
          .from(book)
          .where(eq(book.id, bookid));
        setData(result);
      } catch (err) {
        console.error("Error fetching book data:", err);
        setError("Failed to load book details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(bookid)) {
      fetchData();
    }
  }, [bookid]);

  return { data, loading, error };
};
