import { headers } from "next/headers";

// Server components need a full URL (like https://my-app.vercel.app) to fetch our own API routes.
// We build it from the incoming request's host so it works locally and on Vercel.
export async function getBaseUrl(): Promise<string> {
  const headerList = await headers();
  const host = headerList.get("host") ?? "localhost:3000";
  const protocol = headerList.get("x-forwarded-proto") ?? "http";
  return `${protocol}://${host}`;
}
