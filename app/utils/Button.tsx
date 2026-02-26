"use client";
import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonProps {
  outline?: boolean;
  onclick: () => void;
  name: any;
  custom?: string;
  variant?: "default" | "primary" | "secondary" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  outline, 
  onclick, 
  name, 
  custom,
  variant = "default",
  size = "md",
  icon
}) => {
  const mappedVariant =
    variant === "ghost"
      ? "ghost"
      : variant === "secondary"
        ? "secondary"
        : outline
          ? "outline"
          : "default";

  const mappedSize = size === "md" ? "default" : size;

  return (
    <ShadcnButton
      variant={mappedVariant}
      size={mappedSize}
      className={cn(variant === "gradient" && "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700", custom)}
      onClick={onclick}
    >
      {icon && <span>{icon}</span>}
      <span>{name}</span>
    </ShadcnButton>
  );
};

export default Button;
