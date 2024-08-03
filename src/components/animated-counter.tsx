"use client";
import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration: number;
}

export function AnimatedCounter({ from, to, duration }: AnimatedCounterProps) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const start = Date.now();
    const end = start + duration;

    const step = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * (to - from) + from);
      setCount(value);

      if (now < end) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [from, to, duration]);

  return (
    <div className="text-5xl inline-block transform transition-transform duration-100 ease-out">
      {count}+
    </div>
  );
}
