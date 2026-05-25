export default function SkeletonResults() {
  return (
    <section className="space-y-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="h-56 bg-gray-100 rounded-2xl animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          </div>
          <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] text-gray-400 px-1">
            <span>Technical Skills</span>
            <span>Domain Knowledge</span>
          </div>
          <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] text-gray-400 px-1">
            <span>Soft Skills</span>
            <span>Experience</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-6 w-48 bg-gray-100 rounded animate-pulse" />
          <div className="flex gap-2 flex-wrap">
            <div className="h-8 w-20 bg-green-100 rounded-full animate-pulse" />
            <div className="h-8 w-20 bg-green-100 rounded-full animate-pulse" />
            <div className="h-8 w-20 bg-green-100 rounded-full animate-pulse" />
            <div className="h-8 w-20 bg-green-100 rounded-full animate-pulse" />
          </div>

          <div className="h-6 w-40 bg-gray-100 rounded animate-pulse mt-4" />
          <div className="flex gap-2 flex-wrap">
            <div className="h-8 w-24 bg-red-100 rounded-full animate-pulse" />
            <div className="h-8 w-20 bg-red-100 rounded-full animate-pulse" />
            <div className="h-8 w-16 bg-red-100 rounded-full animate-pulse" />
          </div>

          <div className="h-6 w-40 bg-gray-100 rounded animate-pulse mt-4" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-11/12 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
