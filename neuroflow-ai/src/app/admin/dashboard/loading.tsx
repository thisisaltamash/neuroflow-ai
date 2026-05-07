export default function AdminDashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="skeleton h-10 w-1/3 rounded-xl" />
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="skeleton h-28 rounded-2xl" />
        <div className="skeleton h-28 rounded-2xl" />
        <div className="skeleton h-28 rounded-2xl" />
        <div className="skeleton h-28 rounded-2xl" />
      </div>
      <div className="mt-6 skeleton h-64 rounded-2xl" />
    </div>
  );
}
