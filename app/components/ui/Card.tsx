import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "glass" | "solid" | "outline";
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "glass",
  hover = true,
}) => {
  const variants = {
    glass: "bg-white/60 backdrop-blur-sm border-gray-200/50",
    solid: "bg-white border-gray-200",
    outline: "bg-transparent border-gray-300",
  };

  const hoverClass = hover ? "hover:shadow-md hover:-translate-y-0.5" : "";

  return (
    <div
      className={`rounded-xl p-6 border smooth-transition shadow-sm ${variants[variant]} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
}) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = "",
  gradient = false,
}) => {
  const gradientClass = gradient ? "gradient-text" : "";
  return (
    <h3 className={`text-2xl font-bold ${gradientClass} ${className}`}>
      {children}
    </h3>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => {
  return <div className={`text-gray-700 ${className}`}>{children}</div>;
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = "",
}) => {
  return <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>{children}</div>;
};
