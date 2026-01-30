import { useState } from "react"
import Input from "./form/Input"
import Select from "./form/Select"
import Textarea from "./form/Textarea"
import Label from "./form/Label"

export default function CreateEventModal({ event, onClose, onSubmit }) {
  const isEdit = Boolean(event)

  const [form, setForm] = useState(() =>
    event
      ? {
          name: event.name,
          dateISO: event.dateISO,
          meta: event.meta,
          capacity: event.capacity,
          status: event.status,
          imageUrl: event.imageUrl || "",
        }
      : {
          name: "",
          dateISO: "",
          meta: "",
          capacity: "",
          status: "On Sale",
          imageUrl: "",
        }
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit({
      id: event?.id || form.name.toLowerCase().replace(/\s+/g, "-"),
      sold: event?.sold || 0,
      ...form,
      capacity: Number(form.capacity),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 dark:bg-zinc-900">
        <h2 className="mb-4 text-lg font-semibold">
          {isEdit ? "Edit Event" : "Create Event"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div>
            <Label>Date</Label>
            <Input
              type="datetime-local"
              name="dateISO"
              value={form.dateISO}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Meta</Label>
            <Textarea name="meta" value={form.meta} onChange={handleChange} />
          </div>

          <div>
            <Label>Capacity</Label>
            <Input
              type="number"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Status</Label>
            <Select name="status" value={form.status} onChange={handleChange}>
              <option>On Sale</option>
              <option>Closed</option>
              <option>Draft</option>
            </Select>
          </div>

          <div>
            <Label>Image URL</Label>
            <Input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="rounded-lg border px-4 py-2 text-sm">
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white">
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
