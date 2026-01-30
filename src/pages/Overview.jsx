import RangeTabs from "../components/RangeTabs.jsx";
import StatCards from "../components/StatCards";
import OrdersTable from "../components/OrdersTable";
import DASH_DATA from "../data/DASHDATA.js";
import { useMemo, useState } from "react";
import Loader from "../components/ui/Loader.jsx";
import ErrorState from "../components/ui/ErrorState.jsx";
export default function Overview() {
  const [range, setRange] = useState("week");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const current = useMemo(() => DASH_DATA[range], [range]);
if (loading){
  return <Loader/>
}
 if (error) {
    return (
      <ErrorState
        title="Failed to load "
        description="Something went wrong while loading ."
        actionLabel="Retry"
        onAction={() => {
          setError(false)
          setLoading(true)
        }}
      />
    )
  }
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Main column */}
      <section className="w-auto lg:col-span-12">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Good afternoon, Erica</h1>
        </div>

        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold ">Overview</h2>
          <RangeTabs value={range} onChange={setRange} />
        </div>

        <div className="min-w-0 mt-6">
          <StatCards stats={current.stats} />
        </div>

        <div className="min-w-0 mt-8">
          <OrdersTable rows={current.orders} />
        </div>
      </section>
    </div>
  );
}
