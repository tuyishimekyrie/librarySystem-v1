// app/books/[id]/page.tsx
import React from "react";
import BookDetail from "../BookDetail";
import { fetchBookById } from "@/app/services/bookService";
import Link from "next/link"
import Navbar from "@/app/components/User/Navbar";
interface Book {
  id: number;
  title: string | null;
  author: string | null;
  isbn: string | null;
  description: string | null;
  cover: string | null;
  categoryId: string | null; 
}

interface BookDetailPageProps {
  params: { id: string };
}

const BookDetailPage: React.FC<BookDetailPageProps> = async ({ params }) => {
  const bookid = Number(params.id);

  if (isNaN(bookid)) {
    return <div>Invalid book ID provided.</div>;
  }

  try {
    const data: Book[] = await fetchBookById(bookid);

    if (data.length === 0) {
      return <div>No book found with the provided ID</div>;
    }

    return (
        <div className="flex flex-col">
            <div><Navbar/></div>
            <div className="space-x-4 m-4">

        {data.map((book) => (
            <BookDetail key={book.id} book={book} />
        ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching book data:", error);
    return <div>Failed to load book details. Please try again later.</div>;
  }
};

export default BookDetailPage;
