import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import "./globals.css";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display"
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://neuroflow-ai.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: siteUrl,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>
        <ToastProvider>
          <SiteShell>{children}</SiteShell>
        </ToastProvider>
      </body>
    </html>
  );
}
