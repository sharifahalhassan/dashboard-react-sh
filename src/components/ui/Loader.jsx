export default function Loader({
  size = "md",      // sm | md | lg
  color = "dark",   // dark | light
  className = "",
}) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-4",
  }

  const colors = {
    dark: "border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100",
    light: "border-white/40 border-t-white",
  }

  return (
    <span
      role="status"
      aria-label="Loading"
      className={[
        "inline-block animate-spin rounded-full",
        sizes[size],
        colors[color],
        className,
      ].join(" ")}
    />
  )
}
