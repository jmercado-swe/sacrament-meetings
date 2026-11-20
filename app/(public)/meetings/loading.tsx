// Skeleton cards shown while the meetings list loads from the database
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading meetings">
      <div className="mb-4 h-9 w-48 animate-pulse rounded bg-gray-200" />
      <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-28 animate-pulse rounded border border-gray-200 bg-gray-100" />
        ))}
      </div>
    </div>
  );
}
