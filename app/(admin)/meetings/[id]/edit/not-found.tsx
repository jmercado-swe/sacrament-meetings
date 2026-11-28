import Link from "next/link";

export default function MeetingNotFound() {
  return (
    <main className="py-8 text-center">
      <h1 className="text-3xl font-bold">Meeting not found</h1>
      <p className="mt-3 text-gray-700">We couldn&apos;t find a meeting with that id. It may have been deleted.</p>
      <Link href="/meetings" className="mt-6 inline-block font-semibold text-primary underline">
        Back to all meetings
      </Link>
    </main>
  );
}
