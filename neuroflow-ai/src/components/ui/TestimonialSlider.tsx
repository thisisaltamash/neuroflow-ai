"use client";

import { useEffect, useState } from "react";
import type { TestimonialContent } from "@/types/domain";

type TestimonialSliderProps = {
  testimonials: TestimonialContent[];
};

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[index];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <p className="text-lg leading-relaxed text-white/90">“{current.quote}”</p>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">{current.name}</p>
          <p className="text-xs text-white/60">
            {current.role} · {current.company}
          </p>
        </div>
        <p className="rounded-full border border-red-300/40 px-3 py-1 text-xs text-red-100">{current.impact}</p>
      </div>

      <div className="mt-5 flex gap-2">
        {testimonials.map((item, itemIndex) => (
          <button
            key={item.name}
            aria-label={`Go to testimonial ${itemIndex + 1}`}
            onClick={() => setIndex(itemIndex)}
            className={`h-2.5 rounded-full transition ${itemIndex === index ? "w-8 bg-red-400" : "w-2.5 bg-white/25"}`}
          />
        ))}
      </div>
    </div>
  );
}
