"use client";

import { useState } from "react";
import { useToast } from "@/components/providers/ToastProvider";
import { SERVICE_OPTIONS } from "@/lib/content";

const initialForm = {
  name: "",
  email: "",
  company: "",
  phone: "",
  serviceInterested: SERVICE_OPTIONS[0] || "AI Chatbots",
  message: ""
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.company || !form.serviceInterested || !form.message) {
      showToast("Please fill all required fields.", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      if (!response.ok) {
        showToast(data.error || "Unable to submit inquiry.", "error");
        return;
      }

      showToast("Inquiry submitted successfully. We will contact you soon.", "success");
      setForm(initialForm);
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-24 pt-14 sm:px-6 lg:grid-cols-5 lg:px-8">
      <section className="lg:col-span-2">
        <p className="text-xs uppercase tracking-[0.32em] text-red-200/80">Contact</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Talk to NeuroFlow AI</h1>
        <p className="mt-4 text-white/70">
          Share your current process and goals. We will propose an automation blueprint with scope, timelines, and investment.
        </p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/75">
          <p>Response SLA: within 24 hours</p>
          <p className="mt-2">Best for: businesses, clinics, doctors, startups, agencies, and local companies.</p>
        </div>
      </section>

      <section className="lg:col-span-3">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Full name"
              className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-red-300/50"
              required
            />
            <input
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="Work email"
              type="email"
              className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-red-300/50"
              required
            />
            <input
              value={form.company}
              onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
              placeholder="Company"
              className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-red-300/50"
              required
            />
            <input
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              placeholder="Phone number"
              className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-red-300/50"
              required
            />
          </div>

          <select
            value={form.serviceInterested}
            onChange={(event) => setForm((prev) => ({ ...prev, serviceInterested: event.target.value }))}
            className="mt-4 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-red-300/50"
          >
            {SERVICE_OPTIONS.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>

          <textarea
            value={form.message}
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            rows={6}
            placeholder="Tell us about your current process and desired outcome"
            className="mt-4 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-red-300/50"
            required
          />

          <button
            disabled={loading}
            className="mt-5 inline-flex rounded-full bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Submitting..." : "Submit Inquiry"}
          </button>
        </form>
      </section>
    </div>
  );
}
