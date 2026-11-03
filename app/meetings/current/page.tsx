import { redirect } from "next/navigation";
import { getMeetingForSunday } from "@/lib/meetings-db";
import { getMostRecentSunday } from "@/lib/ward";

// Always run on each request so "this Sunday" stays up to date
export const dynamic = "force-dynamic";

export default function CurrentMeetingPage() {
  const meeting = getMeetingForSunday(getMostRecentSunday());

  // No meeting found: go back to the full list
  redirect(meeting ? `/meetings/${meeting.id}` : "/meetings");
}
