import React from "react";
import Cards from "./Cards";

const page = () => {
  return (
    <div className="text-black p-4">
      <h1 className="text-2xl font-bold p-4">Dashboard</h1>
      <Cards />
    </div>
  );
};

export default page;
