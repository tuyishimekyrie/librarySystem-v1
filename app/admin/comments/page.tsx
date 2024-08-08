import React from "react";
import { db } from "@/drizzle/db";
import CommentTable from "./CommentTable";
import {  comment } from "@/drizzle/db/schema";

const fetchComment = async () => {
  try {
    const comments = await db.select().from(comment);
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

const CommentsPage = async () => {
  const comment = await fetchComment();
  console.log("comment", comment);

  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4 text-black">Books</h1>
      <CommentTable comment={comment} />
    </div>
  );
};

export default CommentsPage;
