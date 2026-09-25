"use client";

import { animate } from "motion";
import { useEffect, useState } from "react";

interface CounterProps {
  to: number;
  duration?: number;
}

export default function Counter({
  to,
  duration = 2,
}: CounterProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [to, duration]);

  return <span>{value.toLocaleString("vi-VN")}</span>;
}
