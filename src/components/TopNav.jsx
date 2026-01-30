import { ChevronLeftIcon } from "@heroicons/react/24/outline"

export default function TopNav({
  // sidebarOpen: حالة توضح هل السايدبار مفتوح أو مغلق
  sidebarOpen,
  // onToggleSidebar: دالة قادمة من المكوّن الأب
  // مسؤولة عن تغيير حالة السايدبار
  onToggleSidebar,
}) {
  return (
    // header يمثل الشريط العلوي للتطبيق
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-3">
          {/* زر التحكم في فتح/إغلاق السايدبار */}
          <button
            type="button"
            // عند الضغط نستدعي الدالة القادمة من الأب
            onClick={onToggleSidebar}
            className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            // aria-label لتحسين الوصولية وشرح وظيفة الزر
            aria-label="Toggle sidebar"
          >
            <ChevronLeftIcon
              // دوران الأيقونة يعتمد على حالة السايدبار
              className={[
                "h-5 w-5 transition-transform duration-300 ease-out text-zinc-900 dark:text-zinc-50",
                // إذا السايدبار مفتوح السهم يكون باتجاهه الطبيعي
                // وإذا مغلق ندوّره 180 درجة للإشارة للاتجاه المعاكس
                sidebarOpen ? "rotate-0" : "rotate-180",
              ].join(" ")}
            />
          </button>

          <h1 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">
            Dashboard
          </h1>

          {/* عناصر الجهة اليمنى من التوب بار */}
          <div className="ml-auto flex items-center gap-3">
            {/* زر دعم */}
            <button className="rounded-full px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition">
              Support
            </button>

            {/* Placeholder حاليًا بدل صورة حقيقية */}
            <div className="h-8 w-8 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          </div>
        </div>
      </div>
    </header>
  )
}
