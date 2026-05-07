"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      setMessage("Thank you! Our team will contact you soon.");
      e.currentTarget.reset();
    } else {
      setMessage("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-14">
      <h1 className="text-4xl font-bold">Contact NeuroFlow AI</h1>
      <p className="text-white/70">Email: 29altamashansari@gmail.com</p>
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
        {["name", "phone", "email", "clinicName"].map((field) => (
          <input key={field} name={field} required placeholder={field} className="w-full rounded-xl border border-white/20 bg-black/40 p-3 outline-none focus:border-blue-500" />
        ))}
        <textarea name="message" required placeholder="Message" rows={5} className="w-full rounded-xl border border-white/20 bg-black/40 p-3 outline-none focus:border-blue-500" />
        <button disabled={loading} className="rounded-full bg-blue-600 px-5 py-2.5 disabled:opacity-60">
          {loading ? "Submitting..." : "Submit"}
        </button>
        <a className="ml-3 rounded-full border border-green-500/50 px-5 py-2.5 text-green-300" href="#">
          WhatsApp
        </a>
      </form>
      {message && <p className="text-blue-300">{message}</p>}
    </div>
  );
}
