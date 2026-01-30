import { useState } from "react";
import OrdersTable from "../components/OrdersTable";
import ordersData from "../data/ORDERSDATA";
import CreateOrderModal from "../components/CreateOrderModal";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";
export default function Orders() {
  // state للتحكم في ظهور البوب اب
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState(ordersData);
  const handleCreateOrder = (newOrder) => {
    setOrders((prev) => [...prev, newOrder]);
    setOpen(false);
  };
if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load order"
        description="Something went wrong while loading orders."
        actionLabel="Retry"
        onAction={() => {
          setError(false)
          setLoading(true)
        }}
      />
    )
  }

  return (
    <section className="min-w-0">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-semibold">Orders</h1>

        <button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 transition"
        >
          Create order
        </button>
      </div>

      <div className="mt-6">
        <OrdersTable rows={orders} />
      </div>

      {/* Popup */}
      {open && (
        <CreateOrderModal
          onClose={() => setOpen(false)}
          onSubmit={handleCreateOrder}
        />
      )}
    </section>
  );
}
