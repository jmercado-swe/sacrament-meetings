// Layout for leader-facing pages. Authentication will be added in Week 05.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <p className="mb-6 rounded bg-yellow-100 p-3 text-sm text-gray-900">
        Leader area (sign-in coming in Week 05)
      </p>
      {children}
    </div>
  );
}
