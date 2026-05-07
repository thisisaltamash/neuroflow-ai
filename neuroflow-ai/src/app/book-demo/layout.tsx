import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Demo",
  description: "Schedule a NeuroFlow AI strategy call to automate lead capture, appointments, and customer workflows."
};

export default function BookDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
