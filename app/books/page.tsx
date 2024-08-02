import { db } from "@/drizzle/db";
import React from "react";
import Navbar from "../components/User/Navbar";
import Link from "next/link";

const page = async () => {
  const data = await db.query.book.findMany();
  console.log("Books Data", data);

  return (
    <div>
      <Navbar />
      <div className="flex space-x-4 m-4">
        {data.map((book) => (
          <Link
            href={`/books/${book.id}`}
            key={book.id}
            className="border border-slate-200 p-4 rounded-md bg-white bg-opacity-20"
          >
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.isbn}</p>
            <p>{book.description}</p>
            {/* <p>{book?.categoryId}</p> */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
