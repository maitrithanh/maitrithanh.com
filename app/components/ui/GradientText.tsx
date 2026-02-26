import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: "purple" | "blue" | "pink" | "rainbow";
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = "",
  gradient = "purple",
}) => {
  const gradients = {
    purple: "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600",
    blue: "bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600",
    pink: "bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600",
    rainbow: "bg-gradient-to-r from-purple-600 via-blue-600 via-green-600 to-yellow-600",
  };

  return (
    <span
      className={`${gradients[gradient]} bg-clip-text text-transparent font-bold ${className}`}
      style={{
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </span>
  );
};
