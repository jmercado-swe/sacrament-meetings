import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";
import { formatMeetingDate } from "@/lib/ward";
import { meetingTypeLabels } from "@/lib/labels";
import DeleteMeetingButton from "./DeleteMeetingButton";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="rounded border border-gray-300 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-bold">
        <Link href={`/meetings/${meeting.id}`} className="text-primary hover:underline">
          {formatMeetingDate(meeting.date)}
        </Link>
      </h2>
      <p className="text-gray-700">{meetingTypeLabels[meeting.meetingType]}</p>
      <p className="mt-2 text-sm text-gray-700">Conducting: {meeting.conducting}</p>
      <div className="mt-3 flex gap-3">
        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="rounded border border-primary px-3 py-1 text-sm font-semibold text-primary hover:bg-gray-50"
          aria-label={`Edit meeting on ${formatMeetingDate(meeting.date)}`}
        >
          Edit
        </Link>
        <DeleteMeetingButton id={meeting.id} label={`Delete meeting on ${formatMeetingDate(meeting.date)}`} />
      </div>
    </article>
  );
}
