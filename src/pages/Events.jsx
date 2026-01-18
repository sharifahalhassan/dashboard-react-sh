// استيراد useState لإدارة حالة الفرز (sortBy) داخل المكوّن
// واستيراد useMemo لحساب قائمة مرتبة (sorted) فقط عند تغيّر sortBy
import { useMemo, useState } from "react"

// استيراد مكوّن EventCard المسؤول عن عرض بطاقة حدث واحدة
// نستخدمه لتقسيم الواجهة: صفحة Events تعرض قائمة، و EventCard يعرض التفاصيل لكل عنصر
import EventCard from "../components/EventCard"

// بيانات الأحداث (Mock Data)
// وضعناها خارج المكوّن عشان تكون ثابتة وما تنعاد إنشاءها مع كل رندر
const EVENTS = [
  {
    // id: معرّف فريد للحدث (يُستخدم للـ key وأحيانًا للروابط/الروت)
    id: "bear-hug",
    // name: اسم الحدث المعروض للمستخدم
    name: "Bear Hug: Live in Concert",
    // dateISO: تاريخ ووقت الحدث بصيغة ISO (مفيد للفرز والتحويل لتاريخ)
    dateISO: "2024-05-20T22:00:00",
    // meta: نص جاهز لعرض تفاصيل مختصرة (تاريخ + وقت + مكان)
    meta: "May 20, 2024 at 10 PM · Harmony Theater, Winnipeg, MB",
    // sold: عدد التذاكر المباعة
    sold: 350,
    // capacity: السعة الكلية للتذاكر
    capacity: 500,
    // status: حالة الحدث (مثل On Sale / Closed)
    status: "On Sale",
    // imageUrl: صورة الحدث لعرضها داخل البطاقة
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

// خيارات الفرز المتاحة للمستخدم
// key: القيمة التي نخزنها في sortBy ونبني عليها منطق الفرز
// label: النص المعروض داخل الـ select
const SORTS = [
  { key: "name", label: "Sort by name" },
  { key: "date", label: "Sort by date" },
  { key: "status", label: "Sort by status" },
]

export default function Events() {
  // sortBy: يحدد نوع الفرز الحالي
  // القيمة الافتراضية "name" تعني الفرز حسب الاسم
  const [sortBy, setSortBy] = useState("name")

  // sorted: قائمة الأحداث بعد تطبيق الفرز حسب sortBy
  // useMemo استخدمناه عشان ما نعيد فرز القائمة في كل رندر
  // فقط عندما تتغير sortBy
  const sorted = useMemo(() => {
    // نسخنا EVENTS إلى arr عشان ما نعدل في المصدر الأصلي
    // لأن sort() يغيّر المصفوفة نفسها (mutates) فلابد ننسخ
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
    // صفحة Events: تعرض عنوان + زر إنشاء + فلتر فرز + قائمة البطاقات
    <section className="min-w-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          {/* عنوان الصفحة */}
          <h1 className="text-2xl font-semibold">Events</h1>
        </div>

        {/* زر إنشاء حدث جديد */}
        {/* حاليًا بدون onClick، غالبًا لاحقًا ينقل لصفحة إنشاء أو يفتح مودال */}
        <button className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 transition">
          Create event
        </button>
      </div>

      {/* منطقة التحكم بالفرز */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <select
          // ربط قيمة select بحالة sortBy (Controlled Component)
          value={sortBy}
          // عند التغيير نحدّث sortBy وبالتالي يعاد حساب sorted
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
        >
          {/* توليد خيارات الفرز من SORTS */}
          {SORTS.map((s) => (
            <option
              // key ضروري في القوائم
              key={s.key}
              // القيمة التي ستُرسل عند الاختيار
              value={s.key}
            >
              {/* النص المعروض للمستخدم */}
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* قائمة الأحداث */}
      <div className="mt-6 space-y-4">
        {/* نعرض EventCard لكل حدث بعد تطبيق الفرز */}
        {sorted.map((ev) => (
          <EventCard
            // key ضروري لتتبع العناصر
            key={ev.id}
            // تمرير بيانات الحدث للبطاقة لتقوم بعرضه
            event={ev}
          />
        ))}
      </div>
    </section>
  )
}
