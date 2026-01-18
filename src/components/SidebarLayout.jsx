// استيراد useEffect من React
// نستخدمه لتنفيذ تأثيرات جانبية (Side Effects) مثل التعامل مع DOM
import { useEffect } from "react";

export default function SidebarLayout({
  // sidebar: محتوى/مكوّن السايدبار الذي سيتم حقنه داخل الـ Layout
  sidebar,
  // topbar: محتوى/مكوّن الشريط العلوي الذي سيتم حقنه داخل الـ Layout
  topbar,
  // children: محتوى الصفحات (المسارات) الذي سيتم عرضه داخل الـ Layout
  children,
  // sidebarOpen: حالة تحدد هل السايدبار مفتوح أو مغلق
  sidebarOpen,
  // setSidebarOpen: دالة لتغيير حالة السايدبار من المكوّن الأب
  setSidebarOpen,
}) {
  useEffect(() => {
    // إذا السايدبار غير مفتوح، ما نحتاج نسوي أي شيء
    if (!sidebarOpen) return;

    // حفظ قيمة overflow الحالية عشان نرجّعها لاحقًا مثل ما كانت
    const prev = document.body.style.overflow;

    // عند فتح السايدبار (خصوصًا على الجوال) نقفل سكرول الصفحة بالخلف
    // هذا يمنع المستخدم من تمرير المحتوى وراء الـ overlay
    document.body.style.overflow = "hidden";

    // cleanup: يرجّع overflow كما كان عند إغلاق السايدبار أو عند إزالة المكوّن
    return () => {
      document.body.style.overflow = prev;
    };
  }, [
    // نربط التأثير بتغيير sidebarOpen
    // يعني ينفّذ/ينظّف كل مرة تتغير فيها حالة فتح/إغلاق السايدبار
    sidebarOpen,
  ]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 overflow-x-hidden">
      {/* Mobile overlay */}
      <div
        // نستخدم مصفوفة + join لبناء className بشكل شرطي
        // الفكرة: نفس العنصر يتغير سلوكه حسب sidebarOpen بدون تكرار markup
        className={[
          // overlay يغطي الشاشة كاملة فوق المحتوى على الشاشات الصغيرة
          "fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-[1px] lg:hidden",
          // انتقالات للظهور/الاختفاء
          "transition-opacity duration-200 ease-out",
          // إذا مفتوح يظهر، وإذا مغلق نخفيه ونمنع تفاعله مع النقر
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        // عند الضغط على الخلفية نغلق السايدبار
        // هذا سلوك متوقع في off-canvas menus على الجوال
        onClick={() => setSidebarOpen(false)}
        // aria-hidden لأن هذا العنصر مجرد طبقة تظليل/تفاعل وليس محتوى معلوماتي
        aria-hidden="true"
      />

      {/* Mobile sidebar (off-canvas) */}
      <div
        // نفس أسلوب بناء className الشرطي
        // هذا هو السايدبار الخاص بالجوال (ينزلق من اليسار)
        className={[
          "fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw]",
          "bg-white dark:bg-zinc-900",
          "border-r border-zinc-200 dark:border-zinc-800",
          // transform + transition لعمل حركة الدخول/الخروج
          "transform transition-transform duration-300 ease-out will-change-transform lg:hidden",
          // إذا مفتوح يكون في مكانه، إذا مغلق يخرج خارج الشاشة
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        // role="dialog" لأن هذا off-canvas يعتبر نافذة/لوحة فوق المحتوى
        role="dialog"
        // aria-modal للتوضيح أن التفاعل يكون داخل هذه اللوحة أثناء فتحها
        aria-modal="true"
        // تسمية للوحة لتحسين الوصولية (Accessibility)
        aria-label="Sidebar"
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="font-semibold">Catalyst</div>
          <button
            // type="button" حتى لا يتصرف كـ submit لو كان داخل form مستقبلاً
            type="button"
            // زر إغلاق السايدبار
            onClick={() => setSidebarOpen(false)}
            className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            // aria-label لأن الأيقونة وحدها قد لا تكون كافية لقراء الشاشة
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* حقن محتوى السايدبار القادم من خارج الـ Layout */}
        <div className="p-3">{sidebar}</div>
      </div>

      {/* Desktop sidebar */}
      <div
        // هذا سايدبار سطح المكتب
        // مخفي على الجوال ويظهر على lg وما فوق
        className={[
          "hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-10 lg:block lg:w-72",
          "bg-white dark:bg-zinc-900",
          "border-r border-zinc-200 dark:border-zinc-800",
          // انتقال بسيط يسمح لنا بإخفاء/إظهار السايدبار حتى على الديسكتوب
          "transition-transform duration-300 ease-out will-change-transform",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="font-semibold">Catalyst</div>
        </div>

        {/* حقن محتوى السايدبار نفسه على الديسكتوب */}
        <div className="p-4 h-screen">{sidebar}</div>
      </div>

      {/* Main content */}
      <div
        // منطقة المحتوى الرئيسية
        // نضيف padding يسار عند فتح السايدبار على الديسكتوب عشان ما يغطي المحتوى
        className={[
          "min-w-0 transition-[padding] duration-300 ease-out",
          sidebarOpen ? "lg:pl-72" : "",
        ].join(" ")}
      >
        {/* topbar مثبت بالأعلى */}
        <div className="sticky top-0 z-20">{topbar}</div>

        {/* المكان الذي تظهر فيه صفحات الراوت (children) */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
