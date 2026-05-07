"use client";

import { useState } from "react";

const replies: Record<string, string> = {
  "Book appointment": "Sure. Please share preferred date and patient name to schedule quickly.",
  "Clinic timing": "Our clinic automation supports custom timings: Mon-Sat, 9:00 AM to 8:00 PM.",
  "Doctor availability": "Dr. placeholder is available today at 5:30 PM and tomorrow at 11:00 AM."
};

export function ChatbotDemo() {
  const [messages, setMessages] = useState<string[]>(["Hello! How can I help your clinic today?"]);

  const ask = (question: keyof typeof replies) => {
    setMessages((prev) => [...prev, `You: ${question}`, `Bot: ${replies[question]}`]);
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-xl">
      <div className="mb-4 space-y-2 text-sm text-white/90">
        {messages.map((msg, i) => (
          <p key={i} className="rounded-lg bg-black/40 p-2">
            {msg}
          </p>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.keys(replies).map((q) => (
          <button key={q} onClick={() => ask(q)} className="rounded-full border border-blue-500/40 px-3 py-1.5 text-xs text-blue-300 hover:bg-blue-500/20">
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
