"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { RiMoonClearLine, RiSunLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
    >
      {isDark ? <RiSunLine size={18} /> : <RiMoonClearLine size={18} />}
    </Button>
  );
};

export default ThemeToggle;
