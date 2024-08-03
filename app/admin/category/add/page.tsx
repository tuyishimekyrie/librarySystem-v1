"use client";

import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";


interface FormData {
  name: string;
}

const BookForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
      console.log(data)
    try {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
      toast.success("Category Saved Successfully");
      reset(); // Reset the form fields
    } catch (error) {
      toast.error("Category Failed to be saved");
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
        <label htmlFor="name" className="block">
          Title:
        </label>
        <input
          id="name"
          {...register("name", { required: true })}
          className="border p-2 w-full"
          placeholder="Name"
        />
      </div>
     
     
     
    
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Submit
      </button>
    </form>
  );
};

export default BookForm;
