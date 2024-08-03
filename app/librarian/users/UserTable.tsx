import Image from 'next/image';
import React from 'react';

interface user {
  id: string;
  name: string | null;
  email: string | null;
    image: string | null;
    emailVerified: Date | null ;
    password: string | null;
}

interface BookTableProps {
  users: user[];
}

const BookTable: React.FC<BookTableProps> = ({ users }) => {
  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          {/* <th className="w-1/6 py-2">ID</th> */}
          <th className="w-1/6 py-2">Name</th>
          <th className="w-1/6 py-2">Email</th>
          <th className="w-1/6 py-2">Image</th>
        </tr>
      </thead>
      <tbody>
        {users.map((book) => (
          <tr key={book.id} className="text-center text-black">
          {/* <td className="py-2">{String(book.id).length > 5 ? String(book.id).substring(0, 2) : id}</td> */}
         
            <td className="py-2">{book.name || 'No title'}</td>
            <td className="py-2">{book.email || 'No author'}</td>
            <td className="py-2 rounded-full">{book.image ? <Image src={book.image} alt="cover" width={40} height={50}/> : 'No cover'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
