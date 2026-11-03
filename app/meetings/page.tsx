import MeetingCard from "@/components/MeetingCard";
import { getBaseUrl } from "@/lib/base-url";
import type { SacramentMeeting } from "@/lib/types";

export default async function MeetingsPage() {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/meetings`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Could not load meetings");
  }

  const meetings: SacramentMeeting[] = await response.json();

  return (
    <main>
      <h1 className="mb-4 text-3xl font-bold">All Meetings</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </main>
  );
}
