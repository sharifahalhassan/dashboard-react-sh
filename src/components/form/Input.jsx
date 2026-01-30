
export default function Input(props) {
  return (
 <input
      {...props}
      className="
        w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900
        focus:outline-none focus:ring-2 focus:ring-zinc-900
        dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50
        dark:focus:ring-zinc-100
      "
    />
  )
}
