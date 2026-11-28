import { notFound } from "next/navigation";
import MeetingForm from "@/components/MeetingForm";
import { updateMeeting } from "@/lib/actions";
import { getMeetingById } from "@/lib/meetings-db";

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({ params }: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  // Bad id (like "abc") or a meeting that doesn't exist -> show not-found.tsx
  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }
  const meeting = await getMeetingById(meetingId);
  if (!meeting) {
    notFound();
  }

  // bind() fills in the id, so the form only has to send its fields
  const updateMeetingWithId = updateMeeting.bind(null, meetingId);

  return (
    <main>
      <h1 className="mb-6 text-3xl font-bold">Edit Meeting</h1>
      <MeetingForm action={updateMeetingWithId} meeting={meeting} submitLabel="Save Changes" />
    </main>
  );
}
