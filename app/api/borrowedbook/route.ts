import { borrowedDateSchema } from "@/app/validations/BorrowedBook";
import { db } from "@/drizzle/db";
import { borrowedbook } from "@/drizzle/db/schema/borrowedbook";
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
  const { success, error } = borrowedDateSchema.safeParse(body);
  if (!success) {
    return NextResponse.json(
      { error: "Validation failed", details: error.errors },
      { status: 400 }
    );
  }

  // Destructure body for clarity
  const { userId, bookId, dueDate } = body;

  // Convert dueDate string to Date object
  const dueDateObject = new Date(dueDate);
  if (isNaN(dueDateObject.getTime())) {
    return NextResponse.json(
      { error: "Invalid dueDate format. Must be a valid date string." },
      { status: 400 }
    );
  }

  // Insert data into the database
  try {
    const newBorrowedBook = await db
      .insert(borrowedbook)
      .values({
        userId,
        bookId,
        dueDate: dueDateObject,
      })
      .returning();

    return NextResponse.json(newBorrowedBook, { status: 201 }); // Use 201 Created for successful creation
  } catch (error) {
    console.error("Database error:", error); // Log error details for debugging
    return NextResponse.json(
      {
        error:
          "An error occurred while saving the borrowed book. Please try again later.",
      },
      { status: 500 }
    );
  }
}
