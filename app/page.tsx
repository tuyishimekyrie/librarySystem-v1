import { db } from "@/drizzle/db";
import HomePage from "./components/HomePage";
import { borrowedbook } from "@/drizzle/db/schema/borrowedbook";
import { useSession } from "next-auth/react";
import { DSpinner } from "react-loadify";

export default async function Home() {
  const { status } = useSession();

  if (status === "loading")
    return <DSpinner size={50} color="blue" borderWidth={5} speed={1000} />;

  return (
    <main className="h-screen flex items-center justify-center">
      <HomePage />
    </main>
  );
}
