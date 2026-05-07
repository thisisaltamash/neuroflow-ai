"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="grid min-h-screen place-items-center bg-black px-4">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-white">Application Error</h2>
          <p className="mt-3 text-white/70">A critical error occurred while rendering this page.</p>
          <button onClick={() => reset()} className="mt-5 rounded-full bg-red-500 px-5 py-2.5 text-sm text-white">
            Retry
          </button>
        </div>
      </body>
    </html>
  );
}
