export default function StatCards({
  stats = [],
}) {
  return (
    // تعرض البطاقات في Grid ويتغير عدد الأعمدة حسب حجم الشاشة
    <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="
            rounded-2xl border border-zinc-200 bg-white p-5
            dark:border-zinc-800 dark:bg-zinc-900
          "
        >
          {/* عنوان الإحصائية (مثلاً: Total revenue) */}
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            {s.label}
          </div>

          {/* القيمة الرئيسية للإحصائية (الرقم الكبير) */}
          <div className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
            {s.value}
          </div>

          {/* التغير أو المقارنة الزمنية (delta) */}
          {/* مثل: +4.5% from last week */}
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {s.delta}
          </div>
        </div>
      ))}
    </div>
  )
}
