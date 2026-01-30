// src/components/form/Row.jsx
export default function Row({ title, desc, children }) {
  return (
    <div className="py-6 sm:grid sm:grid-cols-12 sm:items-start sm:gap-6">
      <div className="sm:col-span-5">
        <div className="text-sm font-semibold">{title}</div>
        <div className="mt-1 text-sm text-zinc-600">{desc}</div>
      </div>
      <div className="mt-4 sm:mt-0 sm:col-span-7">
        {children}
      </div>
    </div>
  )
}
