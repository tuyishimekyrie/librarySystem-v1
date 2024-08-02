"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { DSpinner } from "react-loadify";
import "react-loadify/dist/react-loadify.min.css";

const HomePage = () => {
  const { status, data } = useSession();
  const router = useRouter();
  console.log(status);
  useEffect(() => {
    if (status === "authenticated") router.push("/books", { scroll: false });
  }, [router, status]);
  return (
    <main className="h-screen flex items-center justify-center">
      {status === "loading" ? <span>   <DSpinner size={100} color="blue" borderWidth={5} speed={1000} /></span> :
        <Button>Sign In</Button>}
    </main>
  );
};

export default HomePage;
