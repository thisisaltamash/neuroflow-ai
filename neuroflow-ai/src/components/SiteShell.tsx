"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { FloatingChatbotWidget } from "@/components/FloatingChatbotWidget";
import { Navbar } from "@/components/Navbar";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { StickyCTA } from "@/components/StickyCTA";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <StickyCTA />
      <FloatingChatbotWidget />
    </>
  );
}
