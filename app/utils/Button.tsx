"use client";
import React from "react";

interface ButtonProps {
  outline?: boolean;
  onclick: () => void;
  name: any;
  custom?: string;
}

const Button: React.FC<ButtonProps> = ({ outline, onclick, name, custom }) => {
  return (
    <button
      className={`${
        outline ? "border-main border text-main" : "bg-main text-white"
      } text-sm hover:opacity-80 px-4 py-2 p-1.5 rounded-md ${
        custom ? custom : null
      }`}
      onClick={() => onclick()}
    >
      {name}
    </button>
  );
};

export default Button;
