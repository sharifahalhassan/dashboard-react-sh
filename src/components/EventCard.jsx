function StatusBadge({ status }) {
  const isClosed = status.toLowerCase() === "closed"

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border",
        isClosed
          ? "bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700"
          : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900",
      ].join(" ")}
    >
      {status}
    </span>
  )
}

export default function EventCard({ event, actions }) {
  const pct =
    event.capacity > 0
      ? Math.min(100, Math.round((event.sold / event.capacity) * 100))
      : 0

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 dark:border-zinc-800 dark:bg-zinc-900">
      {/* الهيدر */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <a
            href="#"
            className="block truncate font-semibold text-zinc-900 hover:underline dark:text-zinc-50"
          >
            {event.name}
          </a>

          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {event.meta}
          </div>
        </div>

        {/* يمين الهيدر: الحالة + الأزرار */}
        <div className="flex items-center gap-2 shrink-0">
          <StatusBadge status={event.status} />
          {actions}
        </div>
      </div>

      {/* المحتوى */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <div className="text-zinc-700 dark:text-zinc-200">
            {event.sold}/{event.capacity} tickets sold
          </div>
          <div className="text-zinc-600 dark:text-zinc-400">{pct}%</div>
        </div>

        <div className="mt-2 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-2 rounded-full bg-zinc-900 transition-[width] duration-300 ease-out dark:bg-zinc-100"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
