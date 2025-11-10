export default function Loading() {
  return (
    <main className="p-6 space-y-4">
      <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse" />
      <div className="flex gap-2">
        <div className="h-10 flex-1 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-20 bg-gray-200 rounded animate-pulse" />
      </div>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-5 bg-gray-200 rounded animate-pulse" />
      ))}
    </main>
  );
}