"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { PiBooksFill } from "react-icons/pi";
const Sidebar = () => {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen max-h-screen overflow-hidden">
      <div className="p-4 font-bold text-lg">Librarian Dashboard</div>
      <nav className="mt-4">
        <ul>
          <li className={currentPath === '/admin' ? 'bg-gray-700' : ''}>
            <Link href="/admin">
              <span className="flex items-center py-2 px-4 hover:bg-gray-700">
                <FaHome className="mr-3" />
                Dashboard
              </span>
            </Link>
          </li>
          <li className={currentPath === '/admin/users' ? 'bg-gray-700' : ''}>
            <Link href="/admin/users">
              <span className="flex items-center py-2 px-4 hover:bg-gray-700">
                <FaUser className="mr-3" />
                Users
              </span>
            </Link>
          </li>
          <li className={currentPath === '/admin/books' ? 'bg-gray-700' : ''}>
            <Link href="/admin/books">
              <span className="flex items-center py-2 px-4 hover:bg-gray-700">
                <PiBooksFill className="mr-3" />
                Books
              </span>
            </Link>
          </li>
          <li>
            <span onClick={() => router.push("/api/auth/signout")}  className="flex items-center py-2 px-4 hover:bg-gray-700">
              <FaSignOutAlt className="mr-3" />
              Logout
            </span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
