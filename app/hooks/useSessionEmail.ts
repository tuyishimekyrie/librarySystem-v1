"use server";

import { db } from "@/drizzle/db";
import { users } from "@/drizzle/db/schema";
import { eq } from "drizzle-orm";

async function sessionEmail(email: string) {
  const userRecord = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
     // Add .first() if you expect a single record
  return userRecord;
}

export default sessionEmail;
