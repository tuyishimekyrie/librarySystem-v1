import React from "react";
import Cards from "../admin/Cards";
import BooksChart from "../admin/BooksChart";

const page = () => {
  const mockData = [
    { category: "Fiction", count: 40 },
    { category: "Non-Fiction", count: 30 },
    { category: "Science", count: 20 },
    { category: "History", count: 10 },
  ];
  return (
    <div className="text-black p-4">
      <h1 className="text-2xl font-bold p-4">Dashboard</h1>
      <Cards />
      <BooksChart />
    </div>
  );
};

export default page;
