// components/BookDetail.tsx
import Image from "next/image";
import React from "react";

interface Book {
  id: number;
  title: string | null;
  author: string | null;
  isbn: string | null;
  description: string | null;
  cover: string | null;
  categoryId: string | null; 
}

interface BookDetailProps {
  book: Book;
}

const BookDetail: React.FC<BookDetailProps> = ({ book }) => (
  <div className="">
   {book.cover ?
          <Image
                    src={book?.cover}
                    alt="Uploaded image"
                    width={260}  
                height={100}
                className="w-full max-h-80 object-cover"
                /> : <Image
                    src={`https://res.cloudinary.com/dvr0mdz82/image/upload/v1712323013/htrxg6wcbwyruo8p5pvx.jpg`}
                    alt="Uploaded image"
                    width={260} 
                height={100} 
                className="w-full max-h-80 object-cover"
              />}
    <h2 className="mt-8">{book.title || "No title available"}</h2>
    <p>{book.author || "No author available"}</p>
    <p>{book.isbn || "No ISBN available"}</p>
    <p>{book.description || "No description available"}</p>
    {/* Add other fields as necessary */}
  </div>
);

export default BookDetail;
