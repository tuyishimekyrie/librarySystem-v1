"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { PiBooksFill } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";

const Sidebar = () => {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen max-h-screen overflow-hidden">
      <div className="p-4 font-bold text-lg">Librarian Dashboard</div>
      <nav className="mt-4">
        <ul>
          <li className={currentPath === "/librarian" ? "bg-gray-700" : ""}>
            <Link href="/librarian">
              <span className="flex items-center py-2 px-4 hover:bg-gray-700">
                <FaHome className="mr-3" />
                Dashboard
              </span>
            </Link>
          </li>
          <li
            className={currentPath === "/librarian/users" ? "bg-gray-700" : ""}
          >
            <Link href="/librarian/users">
              <span className="flex items-center py-2 px-4 hover:bg-gray-700">
                <FaUser className="mr-3" />
                Users
              </span>
            </Link>
          </li>
          <li
            className={currentPath === "/librarian/books" ? "bg-gray-700" : ""}
          >
            <Link href="/librarian/books">
              <span className="flex items-center py-2 px-4 hover:bg-gray-700">
                <PiBooksFill className="mr-3" />
                Books
              </span>
            </Link>
          </li>
          <li
            className={
              currentPath === "/librarian/category" ? "bg-gray-700" : ""
            }
          >
            <Link href="/librarian/category">
              <span className="flex items-center py-2 px-4 hover:bg-gray-700">
                <PiBooksFill className="mr-3" />
                Category
              </span>
            </Link>
          </li>
          <li
            className={
              currentPath === "/librarian/category/add" ? "bg-gray-700" : ""
            }
          >
            <Link href="/librarian/category/add">
              <span className="flex items-center py-2 px-4 hover:bg-gray-700">
                <IoIosAddCircleOutline className="mr-3" />
                Add Category
              </span>
            </Link>
          </li>
          <li>
            <span
              onClick={() => router.push("/api/auth/signout")}
              className="flex items-center py-2 px-4 hover:bg-gray-700 hover:cursor-pointer"
            >
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
