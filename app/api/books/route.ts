import { createBookSchema } from "@/app/validations";
import { db } from "@/drizzle/db";
import { book } from "@/drizzle/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body;

  // Try to parse JSON body
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON body. Please provide a valid JSON format." },
      { status: 400 }
    );
  }

  // Validate the parsed body
  const { success, error } = createBookSchema.safeParse(body);
  if (!success) {
    return NextResponse.json(
      { error: "Validation failed", details: error.errors },
      { status: 400 }
    );
  }

  // Destructure body for clarity
  const { title, author, isbn, description, categoryId } = body;

  // Insert data into the database
  try {
    const newBook = await db.insert(book).values({
      title,
      author,
      isbn,
      description,
      categoryId,
    }).returning();

    return NextResponse.json(newBook, { status: 201 }); // Use 201 Created for successful creation
  } catch (error) {
    console.error("Database error:", error); // Log error details for debugging
    return NextResponse.json(
      {
        error:
          "An error occurred while saving the book. Please try again later.",
      },
      { status: 500 }
    );
  }
}
