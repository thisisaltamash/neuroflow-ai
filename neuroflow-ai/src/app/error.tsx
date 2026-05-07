"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-4 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-red-200/80">Error</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Something went wrong</h2>
        <p className="mt-3 text-white/70">The page failed to load. Try again.</p>
        <button onClick={() => reset()} className="mt-5 rounded-full bg-red-500 px-5 py-2.5 text-sm font-medium text-white">
          Retry
        </button>
      </div>
    </div>
  );
}
