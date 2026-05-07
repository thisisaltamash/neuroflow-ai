export default function RootLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="skeleton h-10 w-2/3 rounded-xl" />
      <div className="mt-4 skeleton h-4 w-full rounded-lg" />
      <div className="mt-2 skeleton h-4 w-5/6 rounded-lg" />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="skeleton h-36 rounded-2xl" />
        <div className="skeleton h-36 rounded-2xl" />
        <div className="skeleton h-36 rounded-2xl" />
      </div>
    </div>
  );
}
