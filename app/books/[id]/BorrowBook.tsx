"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import sessionEmail from "@/app/hooks/useSessionEmail";

interface FormData {
  duedate: string;
}

const BorrowBook = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<string | null>(null);
  const pathName = usePathname();
  const segments = pathName.split("/");
  const number = segments[segments.length - 1]; 
  const router = useRouter();

  console.log(number);
  
  useEffect(() => {
    async function fetchUserData() {
      if (status === "authenticated" && session.user?.email) {
        try {
          const userRecord = await sessionEmail(session.user.email);
          console.log("User Record:", userRecord[0].id);
          console.log("User Email:", session.user.email);
          if (userRecord) {
            setUserId(userRecord[0].id);
          }
        } catch (error) {
          console.error("Error fetching user record:", error);
        }
      }
    }
    fetchUserData();
  }, [status,session]);
  if (status === "loading") return <h1>Loading..</h1>;

  const onSubmit = async (data: FormData) => {
    const formData = { dueDate: data.duedate, bookId: number,userId:userId };
    console.log(data);
    console.log(formData);
    try {
      const response = await fetch("/api/borrowedbook", {
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
      reset(); 
      router.push("/")
      
    } catch (error) {
      toast.error("Book Failed to be saved, Try again");
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-full w-screen p-4 rounded-md">
      <div className=" absolute  w-full bg-black bg-opacity-75 top-0 ">
        <div className="h-screen justify-center   flex flex-col items-center text-white">
          <div className="bg-white">
            <h1 className="text-black text-center">Fill the form</h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 p-4 text-black "
            >
              <Toaster />
              <div>
                <label htmlFor="title" className="block">
                  Due Date:
                </label>
                <input
                  type="date"
                  id="duedate"
                  {...register("duedate", { required: true })}
                  className="border p-2 w-full"
                  placeholder="title"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowBook;
