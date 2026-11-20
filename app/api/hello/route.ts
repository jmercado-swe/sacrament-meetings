import { NextResponse } from "next/server";

// GET /api/hello - simple test route (requested in peer review)
export async function GET(): Promise<NextResponse<{ message: string }>> {
  return NextResponse.json({ message: "Hello from Next.js API!" });
}
