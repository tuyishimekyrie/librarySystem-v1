import { db } from "@/drizzle/db";
import React from "react";

const page = async () => {
  const data = await db.query.book.findMany();
  console.log("Books Data", data);

  return (
    <div>
      <div>
        {data.map((book) => (
          <div key={book.id} className="border border-slate-200 p-4">
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.isbn}</p>
            <p>{book.description}</p>
            <p>{book?.categoryId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
