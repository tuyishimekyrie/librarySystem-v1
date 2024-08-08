import React from "react";
import { DSpinner } from "react-loadify";
import "react-loadify/dist/react-loadify.min.css";

const loading = () => {
  return (
    <div className="flex h-screen items-center">
      <DSpinner size={100} color="blue" borderWidth={5} speed={1000} />
    </div>
  );
};

export default loading;
