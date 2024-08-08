"use client";

import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
  comment: string;
}

const AddComment: React.FC = () => {
  const { register, handleSubmit, reset,formState:{isLoading} } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const response = await fetch("/api/comment", {
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
      toast.success("Comment Saved Successfully");
      reset(); // Reset the form fields
    } catch (error) {
      toast.error("Comment Failed to be saved");
      console.error("Error:", error);
    }
    };
    if (isLoading) return toast.loading("we are storing the comment in the database");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 text-black "
    >
      <Toaster />
      <div className="w-full">
        <label htmlFor="name" className="block text-white">
          Comment:
        </label>
        <input
          id="name"
          {...register("comment", { required: true })}
          className="border p-2 "
          placeholder="comment"
        />
      </div>

      <button disabled={isLoading} type="submit" className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-2">
        Submit
      </button>
    </form>
  );
};

export default AddComment;
