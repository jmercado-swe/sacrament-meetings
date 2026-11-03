import type { Hymn, SacramentMeeting } from "@/lib/types";
import { formatMeetingDate } from "@/lib/ward";
import { meetingTypeLabels } from "@/lib/labels";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

interface AgendaRowProps {
  label: string;
  children: React.ReactNode;
}

// One labeled line in the program
function AgendaRow({ label, children }: AgendaRowProps) {
  return (
    <div className="flex flex-col border-b border-gray-200 py-2 sm:flex-row sm:justify-between">
      <dt className="font-semibold">{label}</dt>
      <dd className="text-gray-700 sm:text-right">{children}</dd>
    </div>
  );
}

function hymnText(hymn: Hymn): string {
  return `#${hymn.number} ${hymn.title}`;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  // Stake and general conferences are not sacrament meetings
  const isSacramentMeeting = meeting.meetingType === "regular" || meeting.meetingType === "testimony";

  return (
    <article className="rounded border border-gray-300 bg-white p-6 print:border-0 print:p-0">
      <h1 className="text-3xl font-bold">{formatMeetingDate(meeting.date)}</h1>
      <p className="mb-4 text-lg text-gray-700">{meetingTypeLabels[meeting.meetingType]}</p>

      {!isSacramentMeeting && (
        <p className="mb-4 rounded bg-yellow-100 p-3 text-gray-900">
          There is no sacrament meeting this week.
        </p>
      )}

      <dl>
        <AgendaRow label="Presiding">{meeting.presiding}</AgendaRow>
        <AgendaRow label="Conducting">{meeting.conducting}</AgendaRow>
      </dl>

      <h2 className="mt-6 text-xl font-bold">Announcements</h2>
      {meeting.announcements && meeting.announcements.length > 0 ? (
        <ul className="list-inside list-disc text-gray-700">
          {meeting.announcements.map((announcement) => (
            <li key={announcement}>{announcement}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">No announcements.</p>
      )}

      <h2 className="mt-6 text-xl font-bold">Program</h2>
      <dl>
        <AgendaRow label="Opening Hymn">{hymnText(meeting.openingHymn)}</AgendaRow>
        <AgendaRow label="Opening Prayer">{meeting.openingPrayer}</AgendaRow>
        <AgendaRow label="Ward Business">
          {meeting.wardBusiness.length > 0 ? (
            <ul>
              {meeting.wardBusiness.map((item) => (
                <li key={item.description}>{item.description}</li>
              ))}
            </ul>
          ) : (
            "None"
          )}
        </AgendaRow>
        <AgendaRow label="Stake Business">{meeting.stakeBusiness ? "Yes" : "No"}</AgendaRow>
        {isSacramentMeeting && (
          <AgendaRow label="Sacrament Hymn">{hymnText(meeting.sacramentHymn)}</AgendaRow>
        )}
      </dl>

      <h2 className="mt-6 text-xl font-bold">Speakers &amp; Music</h2>
      {meeting.meetingType === "testimony" ? (
        <p className="text-gray-700">Testimonies from members of the ward.</p>
      ) : meeting.speakers.length > 0 ? (
        <ol className="list-inside list-decimal text-gray-700">
          {meeting.speakers.map((item) => (
            <li key={`${item.name}-${item.topic}`}>
              {item.type === "musical-number" ? "Musical Number: " : ""}
              <strong>{item.name}</strong> - {item.topic}
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-gray-700">No speakers assigned.</p>
      )}

      <dl className="mt-6">
        <AgendaRow label="Closing Hymn">{hymnText(meeting.closingHymn)}</AgendaRow>
        <AgendaRow label="Closing Prayer">{meeting.closingPrayer}</AgendaRow>
      </dl>
    </article>
  );
}
