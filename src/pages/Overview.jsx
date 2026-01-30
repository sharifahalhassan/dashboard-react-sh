import RangeTabs from "../components/RangeTabs.jsx";
import StatCards from "../components/StatCards";
import OrdersTable from "../components/OrdersTable";

import { useMemo, useState } from "react";


const DASH_DATA = {
  week: {
    stats: [
      { label: "Total revenue", value: "$120K", delta: "+4.5% from last week" },
      {
        label: "Average order value",
        value: "$455",
        delta: "-0.5% from last week",
      },
      { label: "Tickets sold", value: "1,288", delta: "+2.1% from last week" },
      { label: "Pageviews", value: "183,067", delta: "+9.2% from last week" },
    ],
    orders: [
      {
        id: "3000",
        date: "May 9, 2024",
        customer: "Leslie Alexander",
        event: "Bear Hug: Live in Concert",
        amount: "US$80.00",
      },
      {
        id: "3001",
        date: "May 5, 2024",
        customer: "Michael Foster",
        event: "Six Fingers — DJ Set",
        amount: "US$299.00",
      },
    ],
  },

  two_weeks: {
    stats: [
      {
        label: "Total revenue",
        value: "$240K",
        delta: "+7.0% vs prev 2 weeks",
      },
      {
        label: "Average order value",
        value: "$468",
        delta: "+1.1% vs prev 2 weeks",
      },
      { label: "Tickets sold", value: "2,744", delta: "+5.3% vs prev 2 weeks" },
      { label: "Pageviews", value: "351,880", delta: "+14.8% vs prev 2 weeks" },
    ],
    orders: [
      {
        id: "2997",
        date: "May 12, 2024",
        customer: "Devon Lane",
        event: "Viking People",
        amount: "US$120.00",
      },
      {
        id: "2998",
        date: "May 10, 2024",
        customer: "Cody Fisher",
        event: "We All Look The Same",
        amount: "US$150.00",
      },
      {
        id: "2999",
        date: "May 9, 2024",
        customer: "Leslie Alexander",
        event: "Bear Hug: Live in Concert",
        amount: "US$80.00",
      },
    ],
  },

  month: {
    stats: [
      { label: "Total revenue", value: "$520K", delta: "+3.4% vs last month" },
      {
        label: "Average order value",
        value: "$442",
        delta: "-1.9% vs last month",
      },
      { label: "Tickets sold", value: "5,888", delta: "+4.5% vs last month" },
      { label: "Pageviews", value: "823,067", delta: "+21.2% vs last month" },
    ],
    orders: [
      {
        id: "2988",
        date: "Apr 28, 2024",
        customer: "Dries Vincent",
        event: "We All Look The Same",
        amount: "US$150.00",
      },
      {
        id: "2989",
        date: "Apr 25, 2024",
        customer: "Kristin Watson",
        event: "Six Fingers — DJ Set",
        amount: "US$299.00",
      },
      {
        id: "2990",
        date: "Apr 22, 2024",
        customer: "Brooklyn Simmons",
        event: "Bear Hug: Live in Concert",
        amount: "US$80.00",
      },
    ],
  },

  quarter: {
    stats: [
      {
        label: "Total revenue",
        value: "$2.6M",
        delta: "+12.4% vs last quarter",
      },
      {
        label: "Average order value",
        value: "$461",
        delta: "+0.8% vs last quarter",
      },
      {
        label: "Tickets sold",
        value: "18,204",
        delta: "+6.2% vs last quarter",
      },
      { label: "Pageviews", value: "2.45M", delta: "+19.1% vs last quarter" },
    ],
    orders: [
      {
        id: "2871",
        date: "Mar 18, 2024",
        customer: "Jane Cooper",
        event: "Viking People",
        amount: "US$120.00",
      },
      {
        id: "2910",
        date: "Feb 26, 2024",
        customer: "Albert Flores",
        event: "Six Fingers — DJ Set",
        amount: "US$299.00",
      },
      {
        id: "2944",
        date: "Jan 14, 2024",
        customer: "Jerome Bell",
        event: "Bear Hug: Live in Concert",
        amount: "US$80.00",
      },
    ],
  },
};

export default function Overview() {
  const [range, setRange] = useState("week");

  // current: البيانات الحالية بناءً على range
  // useMemo استخدمناه عشان نختار DASH_DATA[range] فقط عند تغيّر range
  // هذا يمنع إعادة حساب/قراءة غير ضرورية في كل رندر
  const current = useMemo(() => DASH_DATA[range], [range]);

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
