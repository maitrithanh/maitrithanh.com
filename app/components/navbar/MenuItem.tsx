"use client";
import Link from "next/link";

interface MenuItemProps {
  name: string;
  pathname: string;
  active?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  name,
  pathname,
  active,
}) => {
  return (
    <li>
      <Link
        href={pathname}
        prefetch
        className={`inline-flex h-16 items-center gap-1.5 border-b-2 px-1 text-sm transition-colors ${
          active ? "border-foreground font-medium text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
        }`}
      >
        <span>{name}</span>
      </Link>
    </li>
  );
};

export default MenuItem;
