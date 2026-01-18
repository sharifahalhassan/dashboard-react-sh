// مصفوفة الفترات الزمنية المتاحة
// كل عنصر يحتوي:
// key: القيمة الفعلية التي تُستخدم في المنطق (مثلاً لاختيار البيانات)
// label: النص المعروض للمستخدم داخل القائمة
const ranges = [
  { key: "week", label: "Last week" },
  { key: "two_weeks", label: "Last two weeks" },
  { key: "month", label: "Last month" },
  { key: "quarter", label: "Last quarter" },
]

export default function RangeTabs({
  // value: الفترة الزمنية الحالية المختارة
  value,
  // onChange: دالة قادمة من المكوّن الأب
  // نستخدمها لإبلاغه بأن المستخدم غيّر الفترة
  onChange,
}) {
  return (
    // select يمثل اختيار الفترة الزمنية
    <select
      // ربط القيمة الحالية بالـ state في المكوّن الأب (Controlled Component)
      value={value}
      // عند تغيير الاختيار نرسل القيمة الجديدة للأب
      // e.target.value تعطي key المختار من القائمة
      onChange={(e) => onChange(e.target.value)}
      className="
        rounded-lg border border-zinc-300 bg-white
        px-3 py-1.5 text-sm
        text-zinc-900
        focus:outline-none focus:ring-2 focus:ring-zinc-900
        dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50
        dark:focus:ring-zinc-100
      "
    >
      {/* توليد الخيارات بشكل ديناميكي من مصفوفة ranges */}
      {ranges.map((r) => (
        <option
          // key مهم لـ React لتتبع العناصر داخل القوائم
          key={r.key}
          // value هي القيمة التي ستُرسل عند الاختيار
          value={r.key}
        >
          {/* النص الذي يراه المستخدم */}
          {r.label}
        </option>
      ))}
    </select>
  )
}
