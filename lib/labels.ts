import type { MeetingType } from "./types";

// Friendly names for each meeting type
export const meetingTypeLabels: Record<MeetingType, string> = {
  regular: "Sacrament Meeting",
  testimony: "Fast & Testimony Meeting",
  stake: "Stake Conference",
  general: "General Conference",
};
