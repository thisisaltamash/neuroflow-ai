"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/content";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="text-xl font-semibold tracking-wide text-white">NeuroFlow</span>
          <span className="rounded-full border border-red-400/40 bg-red-500/20 px-2 py-0.5 text-xs font-semibold text-red-200 shadow-[0_0_25px_rgba(255,40,40,0.35)]">
            SYSTEMS
          </span>
        </Link>

        <button
          aria-label="Toggle menu"
          className="inline-flex rounded-lg border border-white/15 p-2 text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="block h-0.5 w-5 bg-current" />
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition ${isActive(pathname, item.href) ? "text-white" : "text-white/70 hover:text-white"}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/book-demo"
            className="rounded-full border border-red-400/40 bg-gradient-to-r from-red-500/20 to-red-400/5 px-4 py-2 text-sm font-medium text-red-100 shadow-[0_0_30px_rgba(255,40,40,0.25)]"
          >
            Book Demo
          </Link>
          <Link href="/admin" className="text-xs uppercase tracking-[0.14em] text-white/50 hover:text-white/80">
            Admin
          </Link>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-black/80 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-2 py-2 text-sm ${isActive(pathname, item.href) ? "bg-white/10 text-white" : "text-white/75"}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/book-demo"
              className="mt-2 rounded-lg border border-red-400/50 bg-red-500/15 px-3 py-2 text-center text-sm text-red-100"
              onClick={() => setOpen(false)}
            >
              Book Demo
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
