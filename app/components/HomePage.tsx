"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { DSpinner } from "react-loadify";
import "react-loadify/dist/react-loadify.min.css";
import Image from "next/image";
import logo from "@/public/aucalogo.png"

const HomePage = () => {
  const { status, data } = useSession();
  const router = useRouter();
  console.log(status);
  useEffect(() => {
    if (status === "authenticated") router.push("/books", { scroll: false });
  }, [router, status]);
  return (
    <main className="h-screen flex pt-10  justify-center">
      {status === "loading" ? <span>   <DSpinner size={100} color="blue" borderWidth={5} speed={1000} /></span> :
        <div className="flex flex-col gap-40 items-center">
          <div className="flex flex-col gap-4 items-center">

          <Image src={logo} alt="logo" width={100} height={100} />
          <span className="mb-14">
            Auca Library System v1.0
          </span>
          </div>
          <Button >Sign In</Button>
        </div>
      }
    </main>
  );
};

export default HomePage;
