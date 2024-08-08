import React from "react";

interface comment {
  id: string;
  comment: string | null;
}

interface CommentTableProps {
  comment: comment[];
}

const CommentTable: React.FC<CommentTableProps> = ({ comment }) => {
  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/6 py-2">ID</th>
          <th className="w-1/6 py-2">Comment</th>
        </tr>
      </thead>
      <tbody>
        {comment.map((book) => (
          <tr key={book.id} className="text-center text-black">
            <td className="py-2">{book.id}</td>
            <td className="py-2">{book.comment || "No title"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommentTable;
