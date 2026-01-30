
export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn’t load this content. Please try again.",
  actionLabel,
  onAction,
  compact = false, // لو داخل كرت أو جدول
}) {
  return (
    <div
      className={[
        "flex flex-col items-center justify-center text-center",
        compact ? "py-6" : "py-16",
      ].join(" ")}
    >
      {/* أيقونة بسيطة بدون مكتبات */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300">
        !
      </div>

      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
