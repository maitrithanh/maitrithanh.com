"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface MenuItemProps {
  name: string;
  icon: React.ReactNode;
  pathname: string;
  active?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  name,
  icon,
  pathname,
  active,
}) => {
  return (
    <li>
      <Button
        asChild
        variant="ghost"
        size="sm"
        className={`h-9 gap-1.5 rounded-full px-3.5 transition-all ${
          active
            ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        <Link href={pathname} prefetch>
          <span>{icon}</span>
          <span>{name}</span>
        </Link>
      </Button>
    </li>
  );
};

export default MenuItem;
