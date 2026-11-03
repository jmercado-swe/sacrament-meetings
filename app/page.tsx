import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Image
        src="/chapel-hero.png"
        alt="Illustration of a chapel with a tall steeple at sunrise"
        width={1200}
        height={500}
        preload
        className="h-auto w-full rounded"
      />
      <h1 className="mt-6 text-4xl font-bold">Sacrament Meeting Planner</h1>
      <p className="mt-3 text-lg text-gray-700">
        Plan and review meeting agendas, and view or print programs for this week and past weeks.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <Link
          href="/meetings/current"
          className="rounded bg-primary px-4 py-2 font-semibold text-white hover:bg-primary-dark"
        >
          This Sunday&apos;s Program
        </Link>
        <Link
          href="/meetings"
          className="rounded border border-primary px-4 py-2 font-semibold text-primary hover:bg-white"
        >
          All Meetings
        </Link>
      </div>
    </main>
  );
}
