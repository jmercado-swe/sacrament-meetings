import type { SacramentMeeting } from "./types";

// Temporary in-memory data. This will be replaced by a database in later weeks.
const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-10-04",
    meetingType: "general",
    presiding: "Bishop Daniel Santos",
    conducting: "Brother Mark Reyes",
    announcements: ["General Conference broadcast in the chapel at 10:00 AM."],
    openingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" },
    openingPrayer: "Sister Ana Cruz",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 0, title: "None (no sacrament meeting)" },
    speakers: [],
    closingHymn: { number: 2, title: "The Spirit of God" },
    closingPrayer: "Brother Leo Garcia",
  },
  {
    id: 2,
    date: "2026-10-11",
    meetingType: "regular",
    presiding: "Bishop Daniel Santos",
    conducting: "Brother John Villanueva",
    announcements: [
      "Ward temple day on Saturday, October 17.",
      "Primary program practice after church.",
    ],
    openingHymn: { number: 85, title: "How Firm a Foundation" },
    openingPrayer: "Sister Grace Lim",
    wardBusiness: [
      { description: "Release of Sister Joy Ramos as Primary pianist." },
      { description: "Sustaining of Brother Paul Tan as Sunday School teacher." },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
    speakers: [
      { name: "Sister Mia Flores", topic: "Gratitude", type: "speaker" },
      { name: "Youth Choir", topic: "I Am a Child of God", type: "musical-number" },
      { name: "Brother Carlo Diaz", topic: "Faith in Jesus Christ", type: "speaker" },
    ],
    closingHymn: { number: 136, title: "I Know That My Redeemer Lives" },
    closingPrayer: "Brother Ben Torres",
  },
  {
    id: 3,
    date: "2026-10-18",
    meetingType: "stake",
    presiding: "President Samuel Mendoza",
    conducting: "President Samuel Mendoza",
    announcements: ["Stake conference at the stake center at 9:00 AM."],
    openingHymn: { number: 6, title: "Redeemer of Israel" },
    openingPrayer: "Sister Rose Aquino",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 0, title: "None (no sacrament meeting)" },
    speakers: [
      { name: "President Samuel Mendoza", topic: "Strengthening Families", type: "speaker" },
      { name: "Stake Choir", topic: "Come, Come, Ye Saints", type: "musical-number" },
    ],
    closingHymn: { number: 3, title: "Now Let Us Rejoice" },
    closingPrayer: "Brother Eli Navarro",
  },
  {
    id: 4,
    date: "2026-10-25",
    meetingType: "regular",
    presiding: "Bishop Daniel Santos",
    conducting: "Brother Mark Reyes",
    announcements: ["Ward Halloween party on Friday, October 30."],
    openingHymn: { number: 72, title: "Praise to the Lord, the Almighty" },
    openingPrayer: "Brother Sam Uy",
    wardBusiness: [{ description: "Sustaining of Sister Lea Bautista as Relief Society secretary." }],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: "I Stand All Amazed" },
    speakers: [
      { name: "Brother Noel Castro", topic: "Ministering", type: "speaker" },
      { name: "Sister Ivy Ramos", topic: "Gently Raise the Sacred Strain (piano solo)", type: "musical-number" },
      { name: "Sister Hope Reyes", topic: "The Sabbath Day", type: "speaker" },
    ],
    closingHymn: { number: 152, title: "God Be with You Till We Meet Again" },
    closingPrayer: "Sister Faith Lopez",
  },
  {
    id: 5,
    date: "2026-11-01",
    meetingType: "testimony",
    presiding: "Bishop Daniel Santos",
    conducting: "Brother John Villanueva",
    announcements: ["Fast offering envelopes are available in the foyer."],
    openingHymn: { number: 26, title: "Joseph Smith's First Prayer" },
    openingPrayer: "Sister Ana Cruz",
    wardBusiness: [{ description: "Baby blessing for the Garcia family." }],
    stakeBusiness: false,
    sacramentHymn: { number: 194, title: "There Is a Green Hill Far Away" },
    speakers: [],
    closingHymn: { number: 116, title: "Come, Follow Me" },
    closingPrayer: "Brother Leo Garcia",
  },
  {
    id: 6,
    date: "2026-11-08",
    meetingType: "regular",
    presiding: "Bishop Daniel Santos",
    conducting: "Brother Mark Reyes",
    announcements: ["Youth service project on Saturday, November 14."],
    openingHymn: { number: 30, title: "Come, Come, Ye Saints" },
    openingPrayer: "Sister Grace Lim",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 172, title: "In Humility, Our Savior" },
    speakers: [
      { name: "Sister Mia Flores", topic: "Prayer", type: "speaker" },
      { name: "Primary Children", topic: "I Am a Child of God", type: "musical-number" },
      { name: "Brother Paul Tan", topic: "Service", type: "speaker" },
    ],
    closingHymn: { number: 98, title: "I Need Thee Every Hour" },
    closingPrayer: "Brother Carlo Diaz",
  },
  {
    id: 7,
    date: "2026-11-15",
    meetingType: "regular",
    presiding: "Bishop Daniel Santos",
    conducting: "Brother John Villanueva",
    openingHymn: { number: 140, title: "Did You Think to Pray?" },
    openingPrayer: "Brother Ben Torres",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: "Jesus of Nazareth, Savior and King" },
    speakers: [
      { name: "Brother Sam Uy", topic: "Repentance", type: "speaker" },
      { name: "Sister Rose Aquino", topic: "The Atonement of Jesus Christ", type: "speaker" },
    ],
    closingHymn: { number: 166, title: "Abide with Me!" },
    closingPrayer: "Sister Hope Reyes",
  },
];

// Returns all meetings (newest first), or only meetings on a given date
export function getMeetings(date?: string | null): SacramentMeeting[] {
  const sorted = [...meetings].sort((a, b) => b.date.localeCompare(a.date));
  if (date) {
    return sorted.filter((meeting) => meeting.date === date);
  }
  return sorted;
}

// Returns one meeting by id, or undefined if not found
export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.id === id);
}

// Returns the meeting for a Sunday, or the closest earlier meeting
export function getMeetingForSunday(sunday: string): SacramentMeeting | undefined {
  return getMeetings().find((meeting) => meeting.date <= sunday);
}
