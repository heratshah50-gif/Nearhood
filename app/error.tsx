"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-neutral-400 mb-2">500</h1>
        <p className="text-lg text-neutral-600 mb-6">Something went wrong. Please try again.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border-2 border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-100 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
