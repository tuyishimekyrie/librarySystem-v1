import { db } from "@/drizzle/db";
import React from "react";
import Navbar from "../components/User/Navbar";
import Link from "next/link";
import UploadImage from "./UploadImage";
import Image from "next/image";

const page = async () => {
  const data = await db.query.book.findMany();
  console.log("Books Data", data);

  return (
    <div>
      <Navbar />
      <div className="flex space-4 m-4 flex-wrap gap-4">
        {data.map((book) => (
          <Link
            href={`/books/${book.id}`}
            key={book.id}
            className="border border-slate-200  rounded-md  bg-opacity-20 "
          >
            {book?.cover ?
          <Image
                    src={book?.cover}
                    alt="Uploaded image"
                    width={260}  
                height={100}
                className="max-h-40 object-cover"
                /> : <Image
                    src={`https://res.cloudinary.com/dvr0mdz82/image/upload/v1712323013/htrxg6wcbwyruo8p5pvx.jpg`}
                    alt="Uploaded image"
                    width={260} 
                    height={100} 
              />}
            <div className="p-4">

            <h2>{book.title}</h2>
            <p className="text-sm text-gray-300">{book.author}</p>
            <p className="text-sm text-gray-300">{book.isbn}</p>
            <p className="text-sm text-gray-300">{book.description}</p>
            {/* <p>{book?.categoryId}</p> */}
            </div>
          </Link>
        ))}
      </div>
      {/* <UploadImage /> */}
      
    </div>
  );
};

export default page;
