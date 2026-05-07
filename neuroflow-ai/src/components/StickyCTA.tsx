import Link from "next/link";

export function StickyCTA() {
  return (
    <div className="fixed bottom-4 left-1/2 z-40 hidden w-[min(92vw,620px)] -translate-x-1/2 rounded-full border border-red-400/30 bg-black/75 p-2 shadow-[0_0_35px_rgba(255,40,40,0.25)] backdrop-blur-xl md:flex md:items-center md:justify-between">
      <p className="pl-3 text-sm text-white/80">Ready to automate inquiries and appointments?</p>
      <div className="flex items-center gap-2">
        <Link href="/contact" className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 hover:border-white/40">
          Contact Team
        </Link>
        <Link href="/book-demo" className="rounded-full bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 text-sm font-medium text-white">
          Book Demo
        </Link>
      </div>
    </div>
  );
}
