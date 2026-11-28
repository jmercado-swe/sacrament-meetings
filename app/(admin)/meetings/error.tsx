"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Shown when something in the meetings pages throws an unexpected error
export default function MeetingsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="py-8 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-gray-700">
        We couldn&apos;t finish that request. Please try again.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded bg-primary px-4 py-2 font-semibold text-white hover:bg-primary-dark"
        >
          Try Again
        </button>
        <Link href="/meetings" className="rounded border border-primary px-4 py-2 font-semibold text-primary">
          Back to meetings
        </Link>
      </div>
    </main>
  );
}
