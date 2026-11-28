"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { addMeeting, deleteMeeting as deleteMeetingFromDb, updateMeeting as updateMeetingInDb } from "./meetings-db";
import type { MeetingInput } from "./meetings-db";
import type { SpeakerItem } from "./types";

// Rules for every field in the meeting form
const MeetingFormSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date."),
  meetingType: z.enum(["regular", "testimony", "stake", "general", "special"], {
    message: "Please choose a meeting type.",
  }),
  presiding: z.string().trim().min(1, "Please enter who is presiding."),
  conducting: z.string().trim().min(1, "Please enter who is conducting."),
  announcements: z.string(),
  openingHymnNumber: z.coerce.number().int().min(1, "Must be 1 or more."),
  openingHymnTitle: z.string().trim().min(1, "Please enter the opening hymn title."),
  openingPrayer: z.string().trim().min(1, "Please enter who gives the opening prayer."),
  wardBusiness: z.string(),
  stakeBusiness: z.boolean(),
  sacramentHymnNumber: z.coerce.number().int().min(0, "Must be 0 or more."),
  sacramentHymnTitle: z.string().trim().min(1, "Please enter the sacrament hymn title."),
  speakers: z.string(),
  closingHymnNumber: z.coerce.number().int().min(1, "Must be 1 or more."),
  closingHymnTitle: z.string().trim().min(1, "Please enter the closing hymn title."),
  closingPrayer: z.string().trim().min(1, "Please enter who gives the closing prayer."),
});

export type MeetingFormField = keyof z.infer<typeof MeetingFormSchema>;

// What the form gets back after a failed submit
export interface State {
  message?: string | null;
  errors?: Partial<Record<MeetingFormField, string[]>>;
}

// Splits a textarea into non-empty lines
function toLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

// Each speaker line is "Name - Topic". Lines starting with "Music:" are musical numbers.
function toSpeakers(text: string): SpeakerItem[] {
  return toLines(text).map((line) => {
    const isMusic = /^music:/i.test(line);
    const rest = isMusic ? line.replace(/^music:\s*/i, "") : line;
    const [name, ...topicParts] = rest.split(" - ");
    return {
      name: name.trim(),
      topic: topicParts.join(" - ").trim(),
      type: isMusic ? "musical-number" : "speaker",
    };
  });
}

// Reads the form and checks it with Zod
function parseMeetingForm(formData: FormData) {
  return MeetingFormSchema.safeParse({
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    announcements: formData.get("announcements") ?? "",
    openingHymnNumber: formData.get("openingHymnNumber"),
    openingHymnTitle: formData.get("openingHymnTitle"),
    openingPrayer: formData.get("openingPrayer"),
    wardBusiness: formData.get("wardBusiness") ?? "",
    stakeBusiness: formData.get("stakeBusiness") === "on",
    sacramentHymnNumber: formData.get("sacramentHymnNumber"),
    sacramentHymnTitle: formData.get("sacramentHymnTitle"),
    speakers: formData.get("speakers") ?? "",
    closingHymnNumber: formData.get("closingHymnNumber"),
    closingHymnTitle: formData.get("closingHymnTitle"),
    closingPrayer: formData.get("closingPrayer"),
  });
}

// Turns valid form data into the shape the database expects
function toMeetingInput(data: z.infer<typeof MeetingFormSchema>): MeetingInput {
  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: toLines(data.announcements),
    openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle },
    openingPrayer: data.openingPrayer,
    wardBusiness: toLines(data.wardBusiness).map((description) => ({ description })),
    stakeBusiness: data.stakeBusiness,
    sacramentHymn: { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle },
    speakers: toSpeakers(data.speakers),
    closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle },
    closingPrayer: data.closingPrayer,
  };
}

// The database rejects two meetings on the same date (UNIQUE constraint)
function isDuplicateDate(error: unknown): boolean {
  return error instanceof Error && /duplicate key|unique/i.test(error.message);
}

export async function createMeeting(_prevState: State, formData: FormData): Promise<State> {
  const result = parseMeetingForm(formData);
  if (!result.success) {
    return {
      message: "Please fix the errors below.",
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  try {
    await addMeeting(toMeetingInput(result.data));
  } catch (error) {
    if (isDuplicateDate(error)) {
      return { message: "A meeting already exists for that date.", errors: { date: ["Choose a different date."] } };
    }
    console.error("createMeeting failed:", error);
    throw new Error("Could not create the meeting. Please try again.");
  }

  // Kept outside try...catch because redirect() works by throwing
  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeeting(id: number, _prevState: State, formData: FormData): Promise<State> {
  const result = parseMeetingForm(formData);
  if (!result.success) {
    return {
      message: "Please fix the errors below.",
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  try {
    const updated = await updateMeetingInDb(id, toMeetingInput(result.data));
    if (!updated) {
      return { message: "This meeting no longer exists." };
    }
  } catch (error) {
    if (isDuplicateDate(error)) {
      return { message: "A meeting already exists for that date.", errors: { date: ["Choose a different date."] } };
    }
    console.error("updateMeeting failed:", error);
    throw new Error("Could not update the meeting. Please try again.");
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  redirect(`/meetings/${id}`);
}

export async function deleteMeeting(id: number): Promise<void> {
  try {
    await deleteMeetingFromDb(id);
  } catch (error) {
    console.error("deleteMeeting failed:", error);
    throw new Error("Could not delete the meeting. Please try again.");
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}
