import Link from "next/link";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/constants";
import { FOOTER_LINKS } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-xl font-semibold text-white">NeuroFlow AI</p>
          <p className="mt-3 max-w-md text-sm text-white/65">
            Production-grade AI automation systems for clinics, startups, agencies, and growth-focused businesses.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Navigation</p>
          <ul className="mt-3 space-y-2">
            {FOOTER_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/70 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Contact</p>
          <p className="mt-3 text-sm text-white/75">{CONTACT_EMAIL}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/75 transition hover:border-red-300/50 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/45">
        © {new Date().getFullYear()} NeuroFlow AI. All rights reserved.
      </div>
    </footer>
  );
}
