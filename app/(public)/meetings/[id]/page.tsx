import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import PrintButton from "@/components/PrintButton";
import { getBaseUrl } from "@/lib/base-url";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/meetings/${id}`, { cache: "no-store" });

  // 400 (bad id) and 404 (not found) both show the "not found" page
  if (response.status === 400 || response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Could not load this meeting");
  }

  const meeting: SacramentMeeting = await response.json();

  return (
    <main>
      <div className="mb-4 flex justify-end">
        <PrintButton />
      </div>
      <MeetingDetail meeting={meeting} />
    </main>
  );
}
