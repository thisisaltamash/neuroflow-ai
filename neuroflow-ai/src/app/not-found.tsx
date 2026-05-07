import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-4 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-red-200/80">404</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-3 text-white/70">The page you requested does not exist.</p>
        <Link href="/" className="mt-5 inline-flex rounded-full bg-red-500 px-5 py-2.5 text-sm font-medium text-white">
          Go Home
        </Link>
      </div>
    </div>
  );
}
