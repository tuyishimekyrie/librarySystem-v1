"use client";
import React from "react";

interface ButtonProps {
  // handleLogin: () => void;
  children: React.ReactNode;
}
 const handleLogin = () => {
   window.location.href = "/api/auth/signin";
 };
const Button = ({  children }: ButtonProps) => {
  return (
    <div>
      <button
        className="border border-slate-300 px-6 py-2 rounded-sm hover:cursor-pointer hover:bg-blue-800 transition-all duration-200"
        onClick={handleLogin}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
