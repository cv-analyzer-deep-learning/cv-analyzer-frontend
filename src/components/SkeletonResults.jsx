export default function SkeletonResults() {
  return (
    <section className="app-card-strong space-y-5 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="h-8 w-44 rounded-full bg-[color:var(--border)]/40 animate-pulse" />
        <div className="h-6 w-20 rounded-full bg-[color:var(--border)]/40 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-4 shadow-sm">
            <div className="h-56 rounded-2xl bg-gradient-to-br from-[rgba(170,59,255,0.08)] via-[rgba(56,189,248,0.04)] to-transparent animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
          <div className="flex justify-between px-1 text-[11px] uppercase tracking-[0.2em] text-[color:var(--text)]/60">
            <span>Technical Skills</span>
            <span>Domain Knowledge</span>
          </div>
          <div className="flex justify-between px-1 text-[11px] uppercase tracking-[0.2em] text-[color:var(--text)]/60">
            <span>Soft Skills</span>
            <span>Experience</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-6 w-48 rounded-full bg-[color:var(--border)]/35 animate-pulse" />
          <div className="flex gap-2 flex-wrap">
            <div className="h-8 w-20 rounded-full bg-emerald-100/70 animate-pulse" />
            <div className="h-8 w-20 rounded-full bg-emerald-100/70 animate-pulse" />
            <div className="h-8 w-20 rounded-full bg-emerald-100/70 animate-pulse" />
            <div className="h-8 w-20 rounded-full bg-emerald-100/70 animate-pulse" />
          </div>

          <div className="mt-4 h-6 w-40 rounded-full bg-[color:var(--border)]/35 animate-pulse" />
          <div className="flex gap-2 flex-wrap">
            <div className="h-8 w-24 rounded-full bg-orange-100/70 animate-pulse" />
            <div className="h-8 w-20 rounded-full bg-orange-100/70 animate-pulse" />
            <div className="h-8 w-16 rounded-full bg-orange-100/70 animate-pulse" />
          </div>

          <div className="mt-4 h-6 w-40 rounded-full bg-[color:var(--border)]/35 animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded-full bg-[color:var(--border)]/28 animate-pulse" />
            <div className="h-4 w-full rounded-full bg-[color:var(--border)]/28 animate-pulse" />
            <div className="h-4 w-11/12 rounded-full bg-[color:var(--border)]/28 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
