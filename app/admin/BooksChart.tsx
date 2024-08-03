"use client"
import React from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";


const BooksChart: React.FC = () => {
  const data = [
    { name: "Fiction", count: 40 },
    { name: "Non-Fiction", count: 30 },
    { name: "Science", count: 20 },
    { name: "History", count: 10 },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Books by Category</h2>
      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default BooksChart;
