import NavLinks from "@/components/NavLinks";

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 border-b border-gray-300 pb-3 text-primary print:hidden">
        <NavLinks
          label="Meetings navigation"
          links={[
            { href: "/meetings", label: "All Meetings", exact: true },
            { href: "/meetings/current", label: "This Sunday" },
          ]}
        />
      </div>
      {children}
    </div>
  );
}
