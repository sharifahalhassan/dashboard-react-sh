function StatusBadge({
  // نستخدمه لعرض شارة (Badge) توضح حالة الحدث بشكل سريع
  status,
}) {
  // تحويل الحالة إلى lowercase ثم مقارنتها بـ "closed"
  // الهدف: نتأكد من المطابقة حتى لو اختلفت كتابة الأحرف (Closed/closed/CLOSED)
  const isClosed = status.toLowerCase() === "closed"

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border",
        // إذا الحدث مغلق نعرض نمط "محايد"
        isClosed
          ? "bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700"
          : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900",
      ].join(" ")}
    >
      {/* عرض نص الحالة كما هو */}
      {status}
    </span>
  )
}

export default function EventCard({
  // المكوّن يعتمد عليه بالكامل لعرض بطاقة واحدة
  event,
}) {
  // pct: نسبة التذاكر المباعة من السعة
  // إذا capacity > 0 نحسب النسبة، وإلا نرجع 0 لتجنب القسمة على صفر
  // Math.round للتقريب لأقرب رقم صحيح
  // Math.min(100, ...) لضمان عدم تجاوز 100% حتى لو sold أكبر من capacity
  const pct =
    event.capacity > 0
      ? Math.min(100, Math.round((event.sold / event.capacity) * 100))
      : 0

  return (
    // بطاقة الحدث: تعرض صورة + اسم + حالة + معلومات + تقدم المبيعات
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start gap-4">
        <img
          // صورة الحدث القادمة من البيانات
          src={event.imageUrl}
          // alt فارغ لأن الصورة تعتبر تجميلية، والمعلومة الأساسية موجودة في النص
          alt=""
          className="h-14 w-14 rounded-xl object-cover border border-zinc-200 dark:border-zinc-800"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <a
              // href="#" لأن الرابط تجريبي حاليًا
              // لاحقًا يمكن تحويله لرابط صفحة تفاصيل الحدث
              href="#"
              className="font-semibold text-zinc-900 hover:underline truncate dark:text-zinc-50"
            >
              {/* اسم الحدث */}
              {event.name}
            </a>

            {/* شارة الحالة: نمرر لها status لتقرر كيف تعرض نفسها */}
            <StatusBadge status={event.status} />
          </div>

          {/* معلومات مختصرة عن الحدث (وقت/مكان...) */}
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {event.meta}
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between text-sm">
              {/* عرض عدد التذاكر المباعة مقابل السعة */}
              <div className="text-zinc-700 dark:text-zinc-200">
                {event.sold}/{event.capacity} tickets sold
              </div>

              {/* عرض النسبة المئوية المحسوبة */}
              <div className="text-zinc-600 dark:text-zinc-400">{pct}%</div>
            </div>

            {/* شريط تقدم بسيط يعتمد على pct */}
            <div className="mt-2 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                // هذا الجزء الداخلي يمثل "التعبئة" داخل شريط التقدم
                // نتحكم بعرضه عبر style بناءً على pct
                className="h-2 rounded-full bg-zinc-900 transition-[width] duration-300 ease-out dark:bg-zinc-100"
                // inline style هنا مناسب لأنه قيمة ديناميكية (width) حسب البيانات
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
