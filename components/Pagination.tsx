"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  // Builds a link to a page while keeping the current search query
  function createPageUrl(page: number): string {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  const linkClass = "rounded border border-primary px-4 py-2 font-semibold text-primary hover:bg-white";
  const disabledClass = "rounded border border-gray-300 px-4 py-2 text-gray-600";

  return (
    <nav aria-label="Meetings pagination" className="mt-6 flex items-center justify-between gap-4">
      {currentPage > 1 ? (
        <Link href={createPageUrl(currentPage - 1)} className={linkClass}>
          Previous
        </Link>
      ) : (
        <span className={disabledClass} aria-disabled="true">
          Previous
        </span>
      )}

      <p className="text-gray-900">
        Page {currentPage} of {totalPages}
      </p>

      {currentPage < totalPages ? (
        <Link href={createPageUrl(currentPage + 1)} className={linkClass}>
          Next
        </Link>
      ) : (
        <span className={disabledClass} aria-disabled="true">
          Next
        </span>
      )}
    </nav>
  );
}
