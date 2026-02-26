"use client";
import React from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  return (
    <li>
      <Button
        variant={active ? "secondary" : "ghost"}
        size="sm"
        className={`h-9 gap-1.5 rounded-lg px-3 ${active ? "bg-black text-white hover:bg-black/90 hover:text-white dark:bg-white dark:text-black dark:hover:bg-white/90" : "text-black/80 dark:text-white/80"}`}
        onClick={() => router.push(pathname)}
      >
        <span>{icon}</span>
        <span>{name}</span>
      </Button>
    </li>
  );
};

export default MenuItem;
