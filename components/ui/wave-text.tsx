import React from "react";
import { cn } from "@/lib/utils";

interface WaveTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  stagger?: number;
}

export function WaveText({
  text,
  className,
  charClassName,
  stagger = 0.06,
}: WaveTextProps) {
  return (
    <span className={cn("inline", className)}>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className={cn("wave-char", charClassName)}
          style={{ animationDelay: `${index * stagger}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
