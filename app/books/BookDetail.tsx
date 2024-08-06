"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import BorrowBook from "./[id]/BorrowBook";

interface Book {
  id: number;
  title: string | null;
  author: string | null;
  isbn: string | null;
  description: string | null;
  cover: string | null;
  categoryId: string | null;
  status?: boolean;
}

interface BookDetailProps {
  book: Book;
}

const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  const [isModal, setModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleModal = () => {
    setModal(!isModal);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setModal(false);
    }
  };

  useEffect(() => {
    // Add event listener to handle clicks outside the modal
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
console.log(book)
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
      {isModal && (
        <div
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-4">
            <BorrowBook />
          </div>
        </div>
      )}
      {!book.status ? (
        <button
          disabled={book.status}
          className="bg-blue-600 my-4 rounded-md px-4 py-2 hover:bg-blue-900"
          onClick={handleModal}
        >
          Borrow Book
        </button>
      ): <h1 className="text-red-500">Book is currently borrowed</h1>}
    </div>
  );
};

export default BookDetail;
