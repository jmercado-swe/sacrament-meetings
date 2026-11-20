import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const ITEMS_PER_PAGE = 5;

// Create the database client only when a query runs,
// so the app can still build if DATABASE_URL is missing.
function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set. Run `vercel env pull .env.local`.");
  }
  return neon(url);
}

// Searches presiding, conducting, meeting type, and speaker names. Newest first, 5 per page.
export async function getMeetings(
  query: string = "",
  currentPage: number = 1
): Promise<SacramentMeeting[]> {
  const sql = getSql();
  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type   AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn   AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business  AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn   AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows as unknown as SacramentMeeting[];
}

// How many pages of results a search has
export async function getMeetingsTotalPages(query: string = ""): Promise<number> {
  const sql = getSql();
  const searchTerm = `%${query}%`;

  const rows = await sql`
    SELECT COUNT(*) AS count FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

// All meetings (used by GET /api/meetings), or only one date (?date=YYYY-MM-DD)
export async function getAllMeetings(date?: string | null): Promise<SacramentMeeting[]> {
  const sql = getSql();

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type   AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn   AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business  AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn   AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE ${date ?? null}::date IS NULL OR date = ${date ?? null}::date
    ORDER BY date DESC
  `;
  return rows as unknown as SacramentMeeting[];
}

// One meeting by id, or null if it doesn't exist
export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const sql = getSql();

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type   AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn   AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business  AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn   AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting | undefined) ?? null;
}

// The id of the meeting on a Sunday, or the closest earlier meeting
export async function getMeetingIdForSunday(sunday: string): Promise<number | null> {
  const sql = getSql();

  const rows = await sql`
    SELECT id FROM meetings
    WHERE date <= ${sunday}::date
    ORDER BY date DESC
    LIMIT 1
  `;
  return rows.length > 0 ? Number(rows[0].id) : null;
}

// Mutation stubs - these will be connected to the database in Week 04
export async function addMeeting(data: Omit<SacramentMeeting, "id">): Promise<SacramentMeeting> {
  throw new Error(`addMeeting for ${data.date}: database implementation coming in Week 04`);
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
  throw new Error(
    `updateMeeting ${id} (${Object.keys(updates).length} fields): coming in Week 04`
  );
}

export async function deleteMeeting(id: number): Promise<boolean> {
  throw new Error(`deleteMeeting ${id}: database implementation coming in Week 04`);
}
