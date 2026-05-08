"use client";

import { useState } from "react";

const quickReplies = [
  {
    prompt: "What automations do you build?",
    answer: "We build AI chatbots, WhatsApp workflows, voice AI call agents, CRM automations, and appointment systems."
  },
  {
    prompt: "How fast can we launch?",
    answer: "Most businesses launch their first automation stack in 10 to 21 days, depending on integration complexity."
  },
  {
    prompt: "Do you work with clinics?",
    answer: "Yes. NeuroFlow Systems specializes in clinic and doctor workflows including inquiry triage, reminders, and booking automation."
  }
];

export function FloatingChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>(["Hi, I am NeuroFlow Systems Assistant. Ask me about AI automation services."]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="mb-3 w-[min(92vw,360px)] rounded-2xl border border-white/15 bg-black/85 p-4 shadow-[0_0_45px_rgba(255,40,40,0.25)] backdrop-blur-2xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">NeuroFlow Assistant</p>
            <button onClick={() => setOpen(false)} className="text-xs text-white/60 hover:text-white">
              Close
            </button>
          </div>

          <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
            {messages.map((msg, index) => (
              <p key={`${msg}_${index}`} className="rounded-lg border border-white/10 bg-white/5 p-2 text-xs text-white/85">
                {msg}
              </p>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <button
                key={reply.prompt}
                onClick={() => setMessages((prev) => [...prev, `You: ${reply.prompt}`, `AI: ${reply.answer}`])}
                className="rounded-full border border-red-300/30 px-3 py-1 text-[11px] text-red-100 hover:bg-red-500/15"
              >
                {reply.prompt}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <button
        onClick={() => setOpen((value) => !value)}
        className="group inline-flex h-14 w-14 items-center justify-center rounded-full border border-red-300/50 bg-red-500/20 text-sm font-semibold text-red-100 shadow-[0_0_35px_rgba(255,40,40,0.45)]"
      >
        AI
      </button>
    </div>
  );
}
