import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Secure admin dashboard for NeuroFlow AI inquiries, bookings, and analytics."
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
