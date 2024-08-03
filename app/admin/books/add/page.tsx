"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { db } from "@/drizzle/db";
import { book } from "@/drizzle/db/schema";
import toast, { Toaster } from "react-hot-toast";

interface CloudinaryResult {
  public_id: string;
  secure_url: string;
}

interface FormData {
  title: string;
  author: string;
  isbn: string;
  description: string;
  categoryId: string;
  cover: string; // Cover will be the Cloudinary public_id
}

const BookForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [publicId, setPublicId] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const onSubmit = async (data: FormData) => {
    const formData = { ...data, cover: imageUrl };
    console.log(formData);
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
        console.log("Success:", result);
        toast.success("Book Saved Successfully");
        reset(); // Reset the form fields
        setPublicId(""); // Clear uploaded image
    } catch (error) {
        toast.error("Book Failed to be saved");
        console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 text-black overflow-y-scroll"
    >
      <Toaster />
      <div>
        <label htmlFor="title" className="block">
          Title:
        </label>
        <input
          id="title"
          {...register("title", { required: true })}
          className="border p-2 w-full"
          placeholder="title"
        />
      </div>
      <div>
        <label htmlFor="author" className="block">
          Author:
        </label>
        <input
          id="author"
          {...register("author", { required: true })}
          className="border p-2 w-full"
          placeholder="author"
        />
      </div>
      <div>
        <label htmlFor="isbn" className="block">
          ISBN:
        </label>
        <input
          id="isbn"
          {...register("isbn", { required: true })}
          className="border p-2 w-full"
          placeholder="isbn"
        />
      </div>
      <div>
        <label htmlFor="description" className="block">
          Description:
        </label>
        <textarea
          id="description"
          {...register("description", { required: true })}
          className="border p-2 w-full"
          placeholder="description"
        />
      </div>
      <div>
        <label htmlFor="categoryId" className="block">
          Category ID:
        </label>
        <input
          id="categoryId"
          {...register("categoryId", { required: true })}
          className="border p-2 w-full"
          placeholder="category"
        />
      </div>
      <div>
        {publicId && (
          <CldImage
            width="80"
            height="40"
            src={publicId}
            sizes="100vw"
            alt="Description of my image"
          />
        )}

        <CldUploadWidget
          uploadPreset="uyrw2jhq"
          onUpload={(result) => {
            if (result.event !== "success") return;
            const info = result.info as unknown as CloudinaryResult;
            setPublicId(info.public_id);
            setImageUrl(info.secure_url);
            console.log(info);
          }}
        >
          {({ open }) => {
            return (
              <button onClick={() => open()} className="bg-blue-400 px-4 py-2">
                Upload an Image
              </button>
            );
          }}
        </CldUploadWidget>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Submit
      </button>
    </form>
  );
};

export default BookForm;
