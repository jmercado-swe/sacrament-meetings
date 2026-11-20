import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

interface MeetingsPageProps {
  searchParams?: Promise<{ query?: string; page?: string }>;
}

export default async function MeetingsPage({ searchParams }: MeetingsPageProps) {
  const params = await searchParams;
  const query = params?.query ?? "";
  const currentPage = Number(params?.page) || 1;

  // Run both database queries at the same time
  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <main>
      <h1 className="mb-4 text-3xl font-bold">All Meetings</h1>
      <MeetingSearch />

      {meetings.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-700">No meetings match your search.</p>
      )}

      <Pagination totalPages={totalPages} />
    </main>
  );
}
