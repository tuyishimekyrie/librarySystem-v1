import { db } from "@/drizzle/db";
import HomePage from "./components/HomePage";
import { borrowedbook } from "@/drizzle/db/schema/borrowedbook";

export default async function Home() {
  return (
    <main className="h-screen flex items-center justify-center">
      <HomePage />
    </main>
  );
}
