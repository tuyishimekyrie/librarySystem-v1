import {  commentSchema } from "@/app/validations";
import { db } from "@/drizzle/db";
import { NextRequest, NextResponse } from "next/server";
import {comment as commentTable} from "@/drizzle/db/schema"
export async function POST(request: NextRequest) {
  let body;

  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON body. Please provide a valid JSON format." },
      { status: 400 }
    );
  }

  const { success, error } = commentSchema.safeParse(body);
  if (!success) {
    return NextResponse.json(
      { error: "Validation failed", details: error.errors },
      { status: 400 }
    );
  }

  const { comment } = body;

  try {
    const newCategory = await db
      .insert(commentTable)
      .values({
        comment,
      })
      .returning();

    return NextResponse.json(newCategory, { status: 201 }); 
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        error:
          "An error occurred while saving the category. Please try again later.",
      },
      { status: 500 }
    );
  }
}
