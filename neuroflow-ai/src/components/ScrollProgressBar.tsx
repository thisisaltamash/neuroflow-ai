"use client";

import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, value)));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[80] h-[2px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-red-400 via-red-500 to-red-300 shadow-[0_0_20px_rgba(255,60,60,0.85)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
