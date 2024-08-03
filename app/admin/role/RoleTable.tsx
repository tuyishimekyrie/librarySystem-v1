import Image from 'next/image';
import React from 'react';

interface roles {
  id: string;
  name: string | null;
}

interface CategoryTableProps {
  role: roles[];
}

const RoleTable: React.FC<CategoryTableProps> = ({ role }) => {
  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/6 py-2">ID</th>
          <th className="w-1/6 py-2">Name</th>
        </tr>
      </thead>
      <tbody>
        {role.map((book) => (
          <tr key={book.id} className="text-center text-black">
            <td className="py-2">{book.id}</td>
            <td className="py-2">{book.name || 'No title'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoleTable;
