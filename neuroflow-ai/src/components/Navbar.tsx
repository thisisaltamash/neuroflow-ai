"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-semibold text-white">
          NeuroFlow <span className="text-blue-500">AI</span>
        </Link>
        <div className="flex items-center gap-5 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "text-blue-400" : "text-white/80 transition hover:text-white"}>
              {item.label}
            </Link>
          ))}
          <Link href="/admin" className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1.5 text-blue-300">
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}
