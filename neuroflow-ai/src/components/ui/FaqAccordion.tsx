"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <article key={item.question} className="rounded-2xl border border-white/10 bg-white/5">
            <button
              onClick={() => setOpen(expanded ? null : index)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <p className="text-sm font-medium text-white">{item.question}</p>
              <span className="text-xs text-white/60">{expanded ? "−" : "+"}</span>
            </button>
            {expanded ? <p className="border-t border-white/10 px-5 py-4 text-sm text-white/70">{item.answer}</p> : null}
          </article>
        );
      })}
    </div>
  );
}
