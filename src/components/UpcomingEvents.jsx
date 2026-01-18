// قائمة بالأحداث القادمة
// استخدمنا مصفوفة بسيطة لأنها بيانات ثابتة (Mock Data)
// كل عنصر يمثل اسم فعالية سيتم عرضها في السايدبار
const events = [
  "Bear Hug: Live in Concert",
  "Six Fingers — DJ Set",
  "We All Look The Same",
  "Viking People",
]

export default function UpcomingEvents() {
  // هذا المكوّن مسؤول عن عرض قائمة بالأحداث القادمة
  // يُستخدم عادة داخل السايدبار كملخص سريع
  return (
    <div className="rounded-2xl pl-0">
      <ul className="mt-4 space-y-2">
        {/* نستخدم map لإنشاء عنصر قائمة لكل حدث */}
        {events.map((e) => (
          <li
            // key ضروري لـ React لتتبع عناصر القائمة
            // استخدمنا اسم الحدث لأنه فريد داخل هذه القائمة
            key={e}
          >
            <a
              // href="#" لأن الرابط تجريبي حالياً
              // لاحقاً يمكن ربطه بصفحة تفاصيل الحدث
              href="#"
              className="
                text-sm text-zinc-700 hover:text-zinc-900
                dark:text-zinc-300 dark:hover:text-zinc-50
                transition
              "
            >
              {/* عرض اسم الحدث */}
              {e}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
