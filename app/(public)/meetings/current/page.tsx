import { redirect } from "next/navigation";
import { getMeetingIdForSunday } from "@/lib/meetings-db";
import { getMostRecentSunday } from "@/lib/ward";

// Always run on each request so "this Sunday" stays up to date
export const dynamic = "force-dynamic";

export default async function CurrentMeetingPage() {
  const meetingId = await getMeetingIdForSunday(getMostRecentSunday());

  // No meeting found: go back to the full list
  redirect(meetingId ? `/meetings/${meetingId}` : "/meetings");
}
