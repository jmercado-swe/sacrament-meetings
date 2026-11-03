import { NextRequest, NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";

// GET /api/meetings or /api/meetings?date=2026-11-01
export async function GET(
  request: NextRequest
): Promise<NextResponse<SacramentMeeting[] | { error: string }>> {
  const date = request.nextUrl.searchParams.get("date");

  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Date must be in YYYY-MM-DD format" }, { status: 400 });
  }

  return NextResponse.json(getMeetings(date));
}
