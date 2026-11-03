import Link from "next/link";
import { connection } from "next/server";
import NavLinks from "./NavLinks";
import { WARD_NAME, WARD_TIME_ZONE } from "@/lib/ward";

export default async function Header() {
  // Wait for a real request so the date is today's date, not the build date
  await connection();

  const today = new Date().toLocaleDateString("en-US", {
    timeZone: WARD_TIME_ZONE,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-primary text-white print:hidden">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="text-2xl font-bold">
            {WARD_NAME}
          </Link>
          <p className="text-sm">{today}</p>
        </div>
        <NavLinks
          label="Main navigation"
          links={[
            { href: "/", label: "Home" },
            { href: "/meetings", label: "Meetings" },
          ]}
        />
      </div>
    </header>
  );
}
