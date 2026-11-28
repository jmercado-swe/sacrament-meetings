"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { MeetingFormField, State } from "@/lib/actions";
import { meetingTypeLabels } from "@/lib/labels";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingFormProps {
  action: (prevState: State, formData: FormData) => Promise<State>;
  meeting?: SacramentMeeting; // filled in when editing
  submitLabel: string;
}

const initialState: State = { message: null, errors: {} };

const inputClass = "mt-1 w-full rounded border border-gray-400 bg-white px-3 py-2";
const labelClass = "block font-semibold";

// Shows the error messages for one field. aria-live makes screen readers announce them.
function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {errors?.map((error) => (
        <p key={error} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      ))}
    </div>
  );
}

export default function MeetingForm({ action, meeting, submitLabel }: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  // Props for an input: matching id/name and a link to its error container
  function field(name: MeetingFormField) {
    return {
      id: name,
      name,
      "aria-describedby": `${name}-error`,
      "aria-invalid": state.errors?.[name] ? true : undefined,
    };
  }

  const speakersText =
    meeting?.speakers
      .map((s) => `${s.type === "musical-number" ? "Music: " : ""}${s.name}${s.topic ? ` - ${s.topic}` : ""}`)
      .join("\n") ?? "";

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.message && (
        <p id="form-message" role="alert" className="rounded bg-red-100 p-3 text-red-800">
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className={labelClass}>Date</label>
          <input type="date" defaultValue={meeting?.date} className={inputClass} {...field("date")} />
          <FieldError id="date-error" errors={state.errors?.date} />
        </div>
        <div>
          <label htmlFor="meetingType" className={labelClass}>Meeting type</label>
          <select defaultValue={meeting?.meetingType ?? "regular"} className={inputClass} {...field("meetingType")}>
            {Object.entries(meetingTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <FieldError id="meetingType-error" errors={state.errors?.meetingType} />
        </div>
        <div>
          <label htmlFor="presiding" className={labelClass}>Presiding</label>
          <input type="text" defaultValue={meeting?.presiding} className={inputClass} {...field("presiding")} />
          <FieldError id="presiding-error" errors={state.errors?.presiding} />
        </div>
        <div>
          <label htmlFor="conducting" className={labelClass}>Conducting</label>
          <input type="text" defaultValue={meeting?.conducting} className={inputClass} {...field("conducting")} />
          <FieldError id="conducting-error" errors={state.errors?.conducting} />
        </div>
      </div>

      <div>
        <label htmlFor="announcements" className={labelClass}>Announcements (one per line)</label>
        <textarea rows={3} defaultValue={meeting?.announcements?.join("\n")} className={inputClass} {...field("announcements")} />
        <FieldError id="announcements-error" errors={state.errors?.announcements} />
      </div>

      <fieldset className="grid gap-5 sm:grid-cols-[8rem_1fr]">
        <legend className="mb-2 text-lg font-bold">Opening</legend>
        <div>
          <label htmlFor="openingHymnNumber" className={labelClass}>Hymn #</label>
          <input type="number" min={1} defaultValue={meeting?.openingHymn.number} className={inputClass} {...field("openingHymnNumber")} />
          <FieldError id="openingHymnNumber-error" errors={state.errors?.openingHymnNumber} />
        </div>
        <div>
          <label htmlFor="openingHymnTitle" className={labelClass}>Hymn title</label>
          <input type="text" defaultValue={meeting?.openingHymn.title} className={inputClass} {...field("openingHymnTitle")} />
          <FieldError id="openingHymnTitle-error" errors={state.errors?.openingHymnTitle} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="openingPrayer" className={labelClass}>Opening prayer</label>
          <input type="text" defaultValue={meeting?.openingPrayer} className={inputClass} {...field("openingPrayer")} />
          <FieldError id="openingPrayer-error" errors={state.errors?.openingPrayer} />
        </div>
      </fieldset>

      <div>
        <label htmlFor="wardBusiness" className={labelClass}>Ward business (one per line)</label>
        <textarea rows={3} defaultValue={meeting?.wardBusiness.map((w) => w.description).join("\n")} className={inputClass} {...field("wardBusiness")} />
        <FieldError id="wardBusiness-error" errors={state.errors?.wardBusiness} />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" defaultChecked={meeting?.stakeBusiness} className="h-5 w-5" {...field("stakeBusiness")} />
        <label htmlFor="stakeBusiness" className="font-semibold">Stake business</label>
      </div>

      <fieldset className="grid gap-5 sm:grid-cols-[8rem_1fr]">
        <legend className="mb-2 text-lg font-bold">Sacrament</legend>
        <div>
          <label htmlFor="sacramentHymnNumber" className={labelClass}>Hymn #</label>
          <input type="number" min={0} defaultValue={meeting?.sacramentHymn.number} className={inputClass} {...field("sacramentHymnNumber")} />
          <FieldError id="sacramentHymnNumber-error" errors={state.errors?.sacramentHymnNumber} />
        </div>
        <div>
          <label htmlFor="sacramentHymnTitle" className={labelClass}>Hymn title</label>
          <input type="text" defaultValue={meeting?.sacramentHymn.title} className={inputClass} {...field("sacramentHymnTitle")} />
          <FieldError id="sacramentHymnTitle-error" errors={state.errors?.sacramentHymnTitle} />
        </div>
      </fieldset>

      <div>
        <label htmlFor="speakers" className={labelClass}>Speakers and music</label>
        <p id="speakers-help" className="text-sm text-gray-700">
          One per line, like &quot;Sister Cruz - Faith&quot;. Start musical numbers with &quot;Music:&quot;.
        </p>
        <textarea rows={4} defaultValue={speakersText} className={inputClass} {...field("speakers")} aria-describedby="speakers-help speakers-error" />
        <FieldError id="speakers-error" errors={state.errors?.speakers} />
      </div>

      <fieldset className="grid gap-5 sm:grid-cols-[8rem_1fr]">
        <legend className="mb-2 text-lg font-bold">Closing</legend>
        <div>
          <label htmlFor="closingHymnNumber" className={labelClass}>Hymn #</label>
          <input type="number" min={1} defaultValue={meeting?.closingHymn.number} className={inputClass} {...field("closingHymnNumber")} />
          <FieldError id="closingHymnNumber-error" errors={state.errors?.closingHymnNumber} />
        </div>
        <div>
          <label htmlFor="closingHymnTitle" className={labelClass}>Hymn title</label>
          <input type="text" defaultValue={meeting?.closingHymn.title} className={inputClass} {...field("closingHymnTitle")} />
          <FieldError id="closingHymnTitle-error" errors={state.errors?.closingHymnTitle} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="closingPrayer" className={labelClass}>Closing prayer</label>
          <input type="text" defaultValue={meeting?.closingPrayer} className={inputClass} {...field("closingPrayer")} />
          <FieldError id="closingPrayer-error" errors={state.errors?.closingPrayer} />
        </div>
      </fieldset>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-primary px-4 py-2 font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
        >
          {isPending ? "Saving..." : submitLabel}
        </button>
        <Link href="/meetings" className="rounded border border-primary px-4 py-2 font-semibold text-primary">
          Cancel
        </Link>
      </div>
    </form>
  );
}
