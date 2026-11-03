// Ward settings used across the app
export const WARD_NAME = "Maple Grove Ward";
export const WARD_TIME_ZONE = "Asia/Manila";

// Today's date in the ward's time zone, as 'YYYY-MM-DD'
export function getTodayInWard(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: WARD_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

// The most recent Sunday (today if today is Sunday), as 'YYYY-MM-DD'
export function getMostRecentSunday(): string {
  const today = new Date(`${getTodayInWard()}T00:00:00Z`);
  today.setUTCDate(today.getUTCDate() - today.getUTCDay());
  return today.toISOString().slice(0, 10);
}

// Formats 'YYYY-MM-DD' as 'Sunday, November 1, 2026'
export function formatMeetingDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
