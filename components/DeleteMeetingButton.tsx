import { deleteMeeting } from "@/lib/actions";

interface DeleteMeetingButtonProps {
  id: number;
  label: string; // accessible name, like "Delete meeting on Sunday, November 1, 2026"
}

// A tiny form that sends the meeting id to the deleteMeeting Server Action
export default function DeleteMeetingButton({ id, label }: DeleteMeetingButtonProps) {
  return (
    <form action={deleteMeeting.bind(null, id)}>
      <button
        type="submit"
        aria-label={label}
        className="rounded border border-red-700 px-3 py-1 text-sm font-semibold text-red-700 hover:bg-red-50"
      >
        Delete
      </button>
    </form>
  );
}
