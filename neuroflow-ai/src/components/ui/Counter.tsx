"use client";

import { useEffect, useState } from "react";

type CounterProps = {
  value: number;
  label: string;
  suffix?: string;
};

export function Counter({ value, label, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const duration = 1100;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setCount(Math.floor(progress * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <p className="text-3xl font-semibold text-white">
        {count.toLocaleString("en-IN")}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-white/65">{label}</p>
    </article>
  );
}
