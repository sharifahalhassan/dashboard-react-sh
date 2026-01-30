import { useMemo, useState } from "react";
import EventCard from "../components/EventCard";
import CreateEventModal from "../components/CreateEventModal";
import EVENTS from "../data/events";
import ErrorState from "../components/ui/ErrorState";
import Loader from "../components/ui/Loader";
const SORTS = [
  { key: "name", label: "Sort by name" },
  { key: "date", label: "Sort by date" },
  { key: "status", label: "Sort by status" },
];

export default function Events() {
  const [sortBy, setSortBy] = useState("name");
  const [events, setEvents] = useState(EVENTS);
  const[loading, setLoading]= useState(false)
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const sorted = useMemo(() => {
    const arr = [...events];
    if (sortBy === "name") arr.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "date")
      arr.sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO));
    if (sortBy === "status")
      arr.sort((a, b) => a.status.localeCompare(b.status));
    return arr;
  }, [events, sortBy]);

  // إضافة أو تعديل
  const handleSaveEvent = (event) => {
    setEvents((prev) => {
      const exists = prev.find((e) => e.id === event.id);
      if (exists) {
        return prev.map((e) => (e.id === event.id ? event : e));
      }
      return [event, ...prev];
    });

    setOpen(false);
    setEditingEvent(null);
  };

  // حذف
  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };
   if (loading) {
    return <Loader />
  }
  if (error) {
    return (
      <ErrorState
        title="ailed to load events"
        description="There was a problem fetching events data."
        actionLabel="Try again"
        onAction={() => {
          setError(false)
          setLoading(true)
        }}
      />
    );
  }

  return (
    <section className="min-w-0">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-semibold">Events</h1>

        <button
          onClick={() => {
            setEditingEvent(null);
            setOpen(true);
          }}
          className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Create event
        </button>
      </div>

      <div className="mt-4 flex gap-2">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm text-black"
        >
          {SORTS.map((s) => (
            <option key={s.key} value={s.key}>
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
            actions={
              <>
                <button
                  onClick={() => {
                    setEditingEvent(ev);
                    setOpen(true);
                  }}
                  className="rounded-lg bg-zinc-800 px-2 py-1 text-xs text-white hover:bg-zinc-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(ev.id)}
                  className="rounded-lg bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-500"
                >
                  Delete
                </button>
              </>
            }
          />
        ))}
      </div>

      {open && (
        <CreateEventModal
          event={editingEvent}
          onClose={() => {
            setOpen(false);
            setEditingEvent(null);
          }}
          onSubmit={handleSaveEvent}
        />
      )}
    </section>
  );
}
