import { useState } from "react"
import EVENTS from "../data/EVENTSDATA"

import Input from "../components/form/Input"
import Select from "../components/form/Select"
import Textarea from "../components/form/Textarea"
import Label from "../components/form/Label"

export default function CreateOrderModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    customer: "",
    eventId: "",
    amount: "",
    notes: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const event = EVENTS.find((e) => e.id === form.eventId)

    onSubmit({
      id: `#${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString(),
      customer: form.customer,
      eventName: event?.name,
      eventImg: event?.imageUrl,
      amount: `$${Number(form.amount).toFixed(2)}`,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 dark:bg-zinc-900">
        <h2 className="mb-4 text-lg font-semibold">Create Order</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label>Customer</Label>
            <Input
              name="customer"
              placeholder="Customer name"
              value={form.customer}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <Label>Event</Label>
            <Select
              name="eventId"
              value={form.eventId}
              onChange={handleChange}
              required
            >
              <option value="">Select event</option>
              {EVENTS.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-1">
            <Label>Amount</Label>
            <Input
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </div>


          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
