import Image from 'next/image';
import React from 'react';

interface Book {
  id: number;
  title: string | null;
  author: string | null;
  isbn: string | null;
  description: string | null;
  cover: string | null;
  categoryId: string | null;
  status?: boolean | null;
}

interface BookTableProps {
  books: Book[];
}

const BookTable: React.FC<BookTableProps> = ({ books }) => {
  return (
    <table className="min-w-full bg-white overflow-y-scroll">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/6 py-2">ID</th>
          <th className="w-1/6 py-2">Title</th>
          <th className="w-1/6 py-2">Author</th>
          <th className="w-1/6 py-2">ISBN</th>
          <th className="w-1/6 py-2">Status</th>
          <th className="w-1/6 py-2">Cover</th>
          {/* <th className="w-1/6 py-2">Category</th> */}
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id} className="text-center text-black">
            <td className="py-2">{book.id}</td>
            <td className="py-2">{book.title || 'No title'}</td>
            <td className="py-2">{book.author || 'No author'}</td>
            <td className="py-2">{book.isbn || 'No ISBN'}</td>
            <td className="py-2">{book.status ? 'Borrowed' : 
              "not borrowed"}</td>
            <td className="py-2">{book.cover ? <Image src={book.cover} alt="cover" width={40} height={50}/> : 'No cover'}</td>
            {/* <td className="py-2">{book.categoryId || 'No category'}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
