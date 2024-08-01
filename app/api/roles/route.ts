import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { roles } from "@/drizzle/db/schema";
import crypto from "crypto";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { roleName } = await request.json();

    if (!roleName) {
      return NextResponse.json(
        { error: "Role name is required." },
        { status: 400 }
      );
    }

    // Check if role already exists
    const rolesResult = await db
      .select()
      .from(roles)
      .where(eq(roles.name, roleName))
      .limit(1);

    const existingRole = rolesResult[0];

    if (existingRole) {
      return NextResponse.json(
        { error: "Role already exists." },
        { status: 400 }
      );
    }

    // Insert the new role
    await db.insert(roles).values({
      id: crypto.randomUUID(),
      name: roleName,
    });

    return NextResponse.json(
      { message: "Role inserted successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
