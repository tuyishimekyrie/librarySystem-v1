import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { users, roles, userRoles } from "@/drizzle/db/schema"; // Assuming you have userRoles table defined
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import crypto from "crypto";

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

    // Generate a UUID for the new user
    const userId = crypto.randomUUID();

    // Insert the new user
    await db.insert(users).values({
      id: userId,
      name,
      email,
      password: hashedPassword,
    });

    // Fetch the student role ID
    const rolesResult = await db
      .select()
      .from(roles)
      .where(eq(roles.name, "student"))
      .limit(1);

    const studentRole = rolesResult[0];

    if (!studentRole) {
      return NextResponse.json(
        { error: "Default role 'student' does not exist." },
        { status: 500 }
      );
    }

    // Insert the default role for the new user
    await db.insert(userRoles).values({
      userId: userId,
      roleId: studentRole.id,
    });

    return NextResponse.json(
      { message: "User registered successfully with default role." },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
