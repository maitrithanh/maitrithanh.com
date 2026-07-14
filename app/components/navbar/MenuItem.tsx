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
        variant={active ? "secondary" : "ghost"}
        size="sm"
        className={`h-9 gap-1.5 rounded-lg px-3 ${
          active
            ? "text-pri hover:bg-pri/20 hover:text-pri border-pri border"
            : "text-muted-foreground hover:text-foreground"
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
