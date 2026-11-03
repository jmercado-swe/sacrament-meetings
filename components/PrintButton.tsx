"use client";

// Client component because window.print() only exists in the browser
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded bg-primary px-4 py-2 font-semibold text-white hover:bg-primary-dark print:hidden"
    >
      Print Program
    </button>
  );
}
