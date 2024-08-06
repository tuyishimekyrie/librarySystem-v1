"use client";
import Image from "next/image";
import React, { useState } from "react";
import BorrowBook from "./[id]/BorrowBook";

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

const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  const [isModal, setModal] = useState<boolean>(false);
  console.log("isModal", isModal);
  const handleModal = () => {
    setModal(!isModal);
    console.log("isModal",isModal)
  }
  return (
    <div className="">
      {book.cover ? (
        <Image
          src={book?.cover}
          alt="Uploaded image"
          width={260}
          height={100}
          className="w-full max-h-80 object-cover"
        />
      ) : (
        <Image
          src={`https://res.cloudinary.com/dvr0mdz82/image/upload/v1712323013/htrxg6wcbwyruo8p5pvx.jpg`}
          alt="Uploaded image"
          width={260}
          height={100}
          className="w-full max-h-80 object-cover"
        />
      )}
      <h2 className="mt-8">{book.title || "No title available"}</h2>
      <p>{book.author || "No author available"}</p>
      <p>{book.isbn || "No ISBN available"}</p>
      <p>{book.description || "No description available"}</p>
      {isModal && <BorrowBook/>}
      <button className="bg-blue-600 my-4 rounded-md px-4 py-2 hover:bg-blue-900" onClick={handleModal}>
        Borrow Book
      </button>
    </div>
  );
};
export default BookDetail;
