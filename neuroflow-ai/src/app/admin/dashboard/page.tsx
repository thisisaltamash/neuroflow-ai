"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BOOKING_STATUS_OPTIONS, STATUS_OPTIONS } from "@/lib/constants";
import { formatDateTime } from "@/lib/format";
import { useToast } from "@/components/providers/ToastProvider";

type PipelineEntry = { _id: string; count: number };

type OverviewPayload = {
  stats: {
    totalLeads: number;
    totalContacts: number;
    totalBookings: number;
    inquiryGrowth: number;
    bookingGrowth: number;
  };
  trend: { month: string; leads: number; bookings: number }[];
  pipelines: {
    leads: PipelineEntry[];
    contacts: PipelineEntry[];
    bookings: PipelineEntry[];
  };
  activity: {
    id: string;
    type: string;
    name: string;
    email: string;
    status: string;
    createdAt: string;
  }[];
};

type InquiryItem = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message?: string;
  serviceInterested?: string;
  status: string;
  createdAt: string;
};

type BookingItem = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  meetingPurpose: string;
  preferredDate: string;
  preferredTime: string;
  status: string;
  createdAt: string;
};

type TabKey = "leads" | "contacts" | "bookings";

const endpoints: Record<TabKey, string> = {
  leads: "/api/admin/leads",
  contacts: "/api/admin/contacts",
  bookings: "/api/admin/bookings"
};

const tabLabels: Record<TabKey, string> = {
  leads: "Leads",
  contacts: "Contacts",
  bookings: "Bookings"
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [authReady, setAuthReady] = useState(false);
  const [overview, setOverview] = useState<OverviewPayload | null>(null);
  const [tab, setTab] = useState<TabKey>("leads");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [items, setItems] = useState<(InquiryItem | BookingItem)[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingOverview, setLoadingOverview] = useState(false);

  const statusOptions = useMemo(() => {
    if (tab === "bookings") return ["all", ...BOOKING_STATUS_OPTIONS];
    return ["all", ...STATUS_OPTIONS];
  }, [tab]);

  const loadOverview = useCallback(async () => {
    setLoadingOverview(true);
    try {
      const response = await fetch("/api/admin/overview", { cache: "no-store" });
      if (response.status === 401) {
        router.replace("/admin");
        return;
      }
      const data = await response.json();
      if (!response.ok) {
        showToast(data.error || "Failed to load dashboard overview.", "error");
        return;
      }
      setOverview(data);
    } catch {
      showToast("Failed to load dashboard overview.", "error");
    } finally {
      setLoadingOverview(false);
    }
  }, [router, showToast]);

  const loadItems = useCallback(
    async (targetTab: TabKey, targetQuery: string, targetStatus: string) => {
      setLoadingList(true);
      try {
        const params = new URLSearchParams({ q: targetQuery, status: targetStatus, limit: "50" });
        const response = await fetch(`${endpoints[targetTab]}?${params.toString()}`, { cache: "no-store" });
        if (response.status === 401) {
          router.replace("/admin");
          return;
        }
        const data = await response.json();
        if (!response.ok) {
          showToast(data.error || `Failed to fetch ${targetTab}.`, "error");
          return;
        }

        setItems(data.items || []);
      } catch {
        showToast("Failed to load records.", "error");
      } finally {
        setLoadingList(false);
      }
    },
    [router, showToast]
  );

  useEffect(() => {
    async function bootstrap() {
      try {
        const response = await fetch("/api/admin/session", { cache: "no-store" });
        const data = await response.json();
        if (!data.authenticated) {
          router.replace("/admin");
          return;
        }

        setAuthReady(true);
      } catch {
        router.replace("/admin");
      }
    }

    bootstrap();
  }, [router]);

  useEffect(() => {
    if (!authReady) return;
    loadOverview();
    loadItems(tab, query, status);
  }, [authReady, loadOverview, loadItems, query, status, tab]);

  async function handleStatusUpdate(id: string, nextStatus: string) {
    try {
      const response = await fetch(endpoints[tab], {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus })
      });
      const data = await response.json();
      if (!response.ok) {
        showToast(data.error || "Failed to update status.", "error");
        return;
      }

      showToast("Status updated.", "success");
      loadItems(tab, query, status);
      loadOverview();
    } catch {
      showToast("Failed to update status.", "error");
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(endpoints[tab], {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await response.json();
      if (!response.ok) {
        showToast(data.error || "Failed to delete record.", "error");
        return;
      }

      showToast("Record deleted.", "success");
      loadItems(tab, query, status);
      loadOverview();
    } catch {
      showToast("Failed to delete record.", "error");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin");
  }

  if (!authReady) {
    return (
      <div className="grid min-h-screen place-items-center bg-black px-4">
        <p className="text-sm text-white/70">Loading dashboard...</p>
      </div>
    );
  }

  const trendMax = Math.max(...(overview?.trend.map((entry) => Math.max(entry.leads, entry.bookings)) || [1]), 1);

  return (
    <div className="min-h-screen bg-black px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-red-200/80">Admin Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">NeuroFlow Analytics and Inquiries</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadOverview} className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/90">
              Refresh
            </button>
            <button onClick={handleLogout} className="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white">
              Logout
            </button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-white/55">Total Leads</p>
            <p className="mt-2 text-3xl font-semibold text-white">{overview?.stats.totalLeads ?? 0}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-white/55">Total Contacts</p>
            <p className="mt-2 text-3xl font-semibold text-white">{overview?.stats.totalContacts ?? 0}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-white/55">Total Bookings</p>
            <p className="mt-2 text-3xl font-semibold text-white">{overview?.stats.totalBookings ?? 0}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-white/55">Monthly Growth</p>
            <p className="mt-2 text-3xl font-semibold text-white">{overview?.stats.inquiryGrowth ?? 0}%</p>
            <p className="mt-1 text-xs text-white/60">Bookings growth: {overview?.stats.bookingGrowth ?? 0}%</p>
          </article>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-5">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Monthly Trend</p>
              {loadingOverview ? <span className="text-xs text-white/60">Updating...</span> : null}
            </div>
            <div className="flex items-end gap-3">
              {(overview?.trend || []).map((entry) => (
                <div key={entry.month} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex w-full items-end gap-1">
                    <div
                      className="w-1/2 rounded bg-red-500/80"
                      style={{ height: `${Math.max(8, (entry.leads / trendMax) * 130)}px` }}
                      title={`Leads: ${entry.leads}`}
                    />
                    <div
                      className="w-1/2 rounded bg-white/50"
                      style={{ height: `${Math.max(8, (entry.bookings / trendMax) * 130)}px` }}
                      title={`Bookings: ${entry.bookings}`}
                    />
                  </div>
                  <p className="text-[11px] text-white/60">{entry.month}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-2">
            <p className="mb-3 text-sm font-semibold text-white">Recent Activity</p>
            <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
              {(overview?.activity || []).map((item) => (
                <div key={`${item.type}_${item.id}`} className="rounded-xl border border-white/10 bg-black/30 p-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-red-100/80">{item.type}</p>
                  <p className="mt-1 text-sm font-medium text-white">{item.name}</p>
                  <p className="text-xs text-white/65">{item.email}</p>
                  <p className="mt-1 text-xs text-white/55">{formatDateTime(item.createdAt)}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex flex-wrap items-center gap-2">
            {(["leads", "contacts", "bookings"] as TabKey[]).map((item) => (
              <button
                key={item}
                onClick={() => {
                  setTab(item);
                  setStatus("all");
                }}
                className={`rounded-full px-4 py-2 text-sm ${tab === item ? "bg-red-500 text-white" : "border border-white/20 text-white/80"}`}
              >
                {tabLabels[item]}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, email, company..."
              className="w-full max-w-sm rounded-xl border border-white/15 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-red-300/50"
            />
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="rounded-xl border border-white/15 bg-black/30 px-4 py-2.5 text-sm text-white outline-none"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button onClick={() => loadItems(tab, query, status)} className="rounded-xl border border-white/20 px-4 py-2.5 text-sm text-white/90">
              Apply Filters
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {loadingList ? <p className="text-sm text-white/60">Loading records...</p> : null}
            {!loadingList && items.length === 0 ? <p className="text-sm text-white/60">No records found.</p> : null}
            {items.map((item) => {
              const booking = item as BookingItem;
              const isBooking = tab === "bookings";
              return (
                <article key={item._id} className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-white/65">
                        {item.email} · {item.phone} · {item.company}
                      </p>
                      {isBooking ? (
                        <p className="mt-1 text-xs text-white/60">
                          {booking.meetingPurpose} · {booking.preferredDate} {booking.preferredTime}
                        </p>
                      ) : (
                        <p className="mt-1 text-xs text-white/60">{(item as InquiryItem).serviceInterested || "-"}</p>
                      )}
                      <p className="mt-1 text-xs text-white/50">Created: {formatDateTime(item.createdAt)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={item.status}
                        onChange={(event) => handleStatusUpdate(item._id, event.target.value)}
                        className="rounded-lg border border-white/20 bg-black/35 px-3 py-2 text-xs text-white"
                      >
                        {(tab === "bookings" ? BOOKING_STATUS_OPTIONS : STATUS_OPTIONS).map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <button onClick={() => handleDelete(item._id)} className="rounded-lg border border-red-400/40 px-3 py-2 text-xs text-red-100">
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
