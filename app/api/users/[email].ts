import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/db/schema";
import { eq } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.query;

  if (typeof email !== "string") {
    return res.status(400).json({ error: "Invalid email parameter" });
  }

  try {
    const userRecord = await db
      .select()
      .from(users)
      .where(eq(users.email,email));
    if (userRecord) {
      return res.status(200).json({ userId: userRecord });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Database query failed:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
