import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/db/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const usersResult = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    const existingUser = usersResult[0]; // Access the first result

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Insert the new user
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      id: crypto.randomUUID(), // Generate a UUID for the new user
    });

    return NextResponse.json(
      { message: "User registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
