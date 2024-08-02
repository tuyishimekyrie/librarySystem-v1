// components/BookDetail.tsx
import React from "react";

interface Book {
  id: number;
  title: string | null;
  author: string | null;
  isbn: string | null;
  description: string | null;
  categoryId: string | null; // Add other fields as necessary
}

interface BookDetailProps {
  book: Book;
}

const BookDetail: React.FC<BookDetailProps> = ({ book }) => (
  <div className="border border-slate-200 p-4 rounded-md bg-white bg-opacity-20">
    <h2>{book.title || "No title available"}</h2>
    <p>{book.author || "No author available"}</p>
    <p>{book.isbn || "No ISBN available"}</p>
    <p>{book.description || "No description available"}</p>
    {/* Add other fields as necessary */}
  </div>
);

export default BookDetail;
