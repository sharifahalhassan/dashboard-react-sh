import { useMemo, useState } from "react"
import EventCard from "../components/EventCard"


const EVENTS = [
  {
    id: "bear-hug",
    name: "Bear Hug: Live in Concert",
    dateISO: "2024-05-20T22:00:00",
    meta: "May 20, 2024 at 10 PM · Harmony Theater, Winnipeg, MB",
    sold: 350,
    capacity: 500,
    status: "On Sale",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=240&q=60",
  },
  {
    id: "six-fingers",
    name: "Six Fingers — DJ Set",
    dateISO: "2024-06-02T20:00:00",
    meta: "Jun 2, 2024 at 8 PM · Moonbeam Arena, Uxbridge, ON",
    sold: 72,
    capacity: 150,
    status: "On Sale",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=240&q=60",
  },
  {
    id: "we-all-look",
    name: "We All Look The Same",
    dateISO: "2024-08-05T16:00:00",
    meta: "Aug 5, 2024 at 4 PM · Electric Coliseum, New York, NY",
    sold: 275,
    capacity: 275,
    status: "Closed",
    imageUrl: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=240&q=60",
  },
  {
    id: "viking-people",
    name: "Viking People",
    dateISO: "2024-12-31T20:00:00",
    meta: "Dec 31, 2024 at 8 PM · Tapestry Hall, Cambridge, ON",
    sold: 6,
    capacity: 40,
    status: "On Sale",
    imageUrl: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=240&q=60",
  },
]

const SORTS = [
  { key: "name", label: "Sort by name" },
  { key: "date", label: "Sort by date" },
  { key: "status", label: "Sort by status" },
]

export default function Events() {
  const [sortBy, setSortBy] = useState("name")
  const sorted = useMemo(() => {
    const arr = [...EVENTS]
    // فرز حسب الاسم باستخدام localeCompare لدعم المقارنة النصية بشكل صحيح
    if (sortBy === "name") arr.sort((a, b) => a.name.localeCompare(b.name))

    // فرز حسب التاريخ بتحويل dateISO إلى Date ثم المقارنة
    if (sortBy === "date") arr.sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO))

    // فرز حسب الحالة (On Sale/Closed...) كمقارنة نصية
    if (sortBy === "status") arr.sort((a, b) => a.status.localeCompare(b.status))

    // نرجع المصفوفة بعد الفرز
    return arr
  }, [
    // إعادة الحساب فقط عند تغيّر sortBy
    sortBy,
  ])

  return (
    <section className="min-w-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Events</h1>
        </div>
        <button className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 transition">
          Create event
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
        >
          {SORTS.map((s) => (
            <option
              key={s.key}
              value={s.key}
            >
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 space-y-4">
        {sorted.map((ev) => (
          <EventCard
            key={ev.id}
            event={ev}
          />
        ))}
      </div>
    </section>
  )
}
