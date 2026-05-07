"use client";

import { useMemo, useState } from "react";
import { useToast } from "@/components/providers/ToastProvider";
import { BUSINESS_TYPES, MEETING_PURPOSES } from "@/lib/content";

const todayIso = new Date().toISOString().split("T")[0];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  businessType: BUSINESS_TYPES[0] || "Clinic",
  meetingPurpose: MEETING_PURPOSES[0] || "Strategy Call",
  preferredDate: todayIso,
  preferredTime: "11:00",
  notes: ""
};

export default function BookDemoPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.company || !form.preferredDate || !form.preferredTime) {
      showToast("Please complete all required fields.", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.error || "Unable to create booking.", "error");
        return;
      }

      showToast("Demo request submitted. We will confirm your slot shortly.", "success");
      setForm({ ...initialForm, preferredDate: minDate });
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-24 pt-14 sm:px-6 lg:grid-cols-5 lg:px-8">
      <section className="lg:col-span-2">
        <p className="text-xs uppercase tracking-[0.32em] text-red-200/80">Book Demo</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Schedule Your AI Automation Strategy Session</h1>
        <p className="mt-4 text-white/70">
          Pick your preferred date and time. We’ll review your process and map an execution plan for lead generation, appointment automation, and support.
        </p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/75">
          <p>Meeting duration: 30-45 minutes</p>
          <p className="mt-2">Format: Google Meet / Zoom</p>
        </div>
      </section>

      <section className="lg:col-span-3">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              required
              placeholder="Full name"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-red-300/50"
            />
            <input
              required
              type="email"
              placeholder="Work email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-red-300/50"
            />
            <input
              required
              placeholder="Phone"
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-red-300/50"
            />
            <input
              required
              placeholder="Company"
              value={form.company}
              onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
              className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-red-300/50"
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <select
              value={form.businessType}
              onChange={(event) => setForm((prev) => ({ ...prev, businessType: event.target.value }))}
              className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-red-300/50"
            >
              {BUSINESS_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={form.meetingPurpose}
              onChange={(event) => setForm((prev) => ({ ...prev, meetingPurpose: event.target.value }))}
              className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-red-300/50"
            >
              {MEETING_PURPOSES.map((purpose) => (
                <option key={purpose} value={purpose}>
                  {purpose}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              type="date"
              min={minDate}
              value={form.preferredDate}
              onChange={(event) => setForm((prev) => ({ ...prev, preferredDate: event.target.value }))}
              className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-red-300/50"
              required
            />
            <input
              type="time"
              value={form.preferredTime}
              onChange={(event) => setForm((prev) => ({ ...prev, preferredTime: event.target.value }))}
              className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-red-300/50"
              required
            />
          </div>

          <textarea
            rows={5}
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
            className="mt-4 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-red-300/50"
          />

          <button
            disabled={loading}
            className="mt-5 inline-flex rounded-full bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Booking..." : "Confirm Demo Request"}
          </button>
        </form>
      </section>
    </div>
  );
}
