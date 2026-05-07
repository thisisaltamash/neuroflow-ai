"use client";

import { FormEvent, useEffect, useState } from "react";

type Lead = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  clinicName: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
};

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [error, setError] = useState("");

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") })
    });
    if (res.ok) {
      setLoggedIn(true);
      setError("");
    } else setError("Invalid credentials");
  }

  async function fetchLeads() {
    const res = await fetch(`/api/admin/leads?q=${encodeURIComponent(q)}&status=${encodeURIComponent(status)}`);
    if (res.status === 401) return setLoggedIn(false);
    const data = await res.json();
    setLeads(data.leads || []);
  }

  async function updateStatus(id: string, newStatus: string) {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus })
    });
    fetchLeads();
  }

  useEffect(() => {
    if (loggedIn) fetchLeads();
  }, [loggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!loggedIn) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <h1 className="mb-6 text-3xl font-bold">Admin Login</h1>
        <form onSubmit={login} className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6">
          <input className="w-full rounded-lg border border-white/20 bg-black/40 p-3" required name="email" placeholder="Email" />
          <input className="w-full rounded-lg border border-white/20 bg-black/40 p-3" required name="password" type="password" placeholder="Password" />
          <button className="rounded-full bg-blue-600 px-5 py-2">Login</button>
          {error && <p className="text-red-400">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold">Lead Dashboard</h1>
      <div className="flex flex-wrap gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name/email/clinic" className="rounded-lg border border-white/20 bg-black/40 p-2.5" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-white/20 bg-black/40 p-2.5">
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
        <button onClick={fetchLeads} className="rounded-full border border-blue-500/40 px-4">Apply</button>
      </div>
      <div className="space-y-3">
        {leads.map((lead) => (
          <div key={lead._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="font-semibold">{lead.name} · {lead.clinicName}</p>
            <p className="text-sm text-white/70">{lead.email} · {lead.phone}</p>
            <p className="my-2 text-white/80">{lead.message}</p>
            <select value={lead.status} onChange={(e) => updateStatus(lead._id, e.target.value)} className="rounded-lg border border-white/20 bg-black/40 p-2">
              <option value="new">new</option>
              <option value="contacted">contacted</option>
              <option value="closed">closed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
