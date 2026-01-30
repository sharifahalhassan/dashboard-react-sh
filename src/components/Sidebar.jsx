// NavLink من react-router-dom
// نستخدمه بدل <a> لأنه يتعامل مع الراوتينق داخل SPA
// ويعطينا isActive لمعرفة الصفحة الحالية وتغيير العرض بناءً عليها
import { NavLink } from "react-router-dom";

// استيراد أيقونات جاهزة من heroicons
// استخدمناها لتوضيح العناصر بصريًا وتحسين تجربة التنقل
import {
  HomeIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  ClockIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";

// مكوّن يعرض قائمة/ملخص للأحداث القادمة داخل السايدبار
import UpcomingEvents from "./UpcomingEvents";

// عناصر التنقل الرئيسية في السايدبار
// وضعناها في مصفوفة لتسهيل الإضافة/الحذف بدل تكرار JSX لكل رابط
const navItems = [
  // end: true معناها هذا الرابط يعتبر نشط فقط عند المسار "/" بالضبط
  // بدون end قد يعتبر "/" نشط حتى لو كنت في "/events" لأنه يبدأ بـ "/"
  { to: "/", label: "Home", icon: HomeIcon, end: true },
  { to: "/events", label: "Events", icon: CalendarDaysIcon },
  { to: "/orders", label: "Orders", icon: TicketIcon },
  { to: "/settings", label: "Settings", icon: Cog6ToothIcon },
];

// عناصر ثانوية (عادة روابط أقل استخدامًا) مثل الدعم والتحديثات
// فصلناها عن الرئيسية عشان تنظيم القائمة منطقي وواضح
const secondaryItems = [
  { to: "/support", label: "Support", icon: LifebuoyIcon },
  { to: "/changelog", label: "Changelog", icon: ClockIcon },
];

export default function Sidebar({ onNavigate }) {
  const user = JSON.parse(localStorage.getItem("user"))

  // onNavigate: callback اختياري
  // نستخدمه غالبًا لإغلاق السايدبار على الجوال بعد الضغط على رابط
  // لذلك استخدمنا optional chaining عند استدعائه
  return (
    <div className="flex h-full flex-col ">
      <div className="flex-1 space-y-6">
        <nav className="space-y-1">
          {/* نعمل map على navItems عشان ننشئ روابط التنقل ديناميكيًا */}
          {navItems.map((item) => {
            // نخزن الأيقونة في متغير Icon عشان نقدر نرندرها كمكوّن
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => onNavigate?.()}
                className={({ isActive }) =>
                  [
                    "group w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                    // إذا الرابط نشط نغير شكله ليظهر أنه الحالي
                    isActive
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800",
                  ].join(" ")
                }
              >
                {/* NavLink يدعم render-prop pattern لتمرير isActive داخل المحتوى */}
                {({ isActive }) => (
                  <>
                    <Icon
                      // نغير العرض حسب كون الرابط نشط أو لا
                      className={[
                        "h-5 w-5 shrink-0 transition",
                        isActive
                          ? "text-white dark:text-zinc-900"
                          : "text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200",
                      ].join(" ")}
                    />
                    {/* عرض النص القادم من item.label */}
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Upcoming */}
        <div className="space-y-3">
          <div className="h-px flex items-center gap-3" />
          <div className="px-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
              Upcoming events
            </div>
            <div className="h-fit">
              {/* عرض مكوّن الأحداث القادمة داخل السايدبار */}
              <UpcomingEvents />
            </div>
          </div>
        </div>
      </div>

      {/* الجزء السفلي من السايدبار: روابط ثانوية + معلومات المستخدم */}
      <div className="mt-auto mb-10">
        <div className="space-y-1">
          {/* نفس فكرة القائمة الرئيسية لكن للروابط الثانوية */}
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                // هنا ما نحتاج end لأن المسارات ليست "/"
                onClick={() => onNavigate?.()}
                className={({ isActive }) =>
                  [
                    "group w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={[
                        "h-5 w-5 shrink-0 transition",
                        isActive
                          ? "text-white dark:text-zinc-900"
                          : "text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200",
                      ].join(" ")}
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* User footer */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-3">
          {/* هذا زر/منطقة تعرض معلومات المستخدم */}
          {/* ممكن لاحقًا نربطه بصفحة Profile أو قائمة حساب */}
          <button className="flex w-full items-center gap-3 rounded-xl px-2 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
            {/* صورة المستخدم */}
            <img
              // رابط صورة افتراضية للتجربة
              src="https://i.pravatar.cc/40"
              // alt مهم للوصولية إذا ما ظهرت الصورة
              alt="User avatar"
              className="h-9 w-9 rounded-full"
            />
          <div className="min-w-0 text-left">
  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">
    {user?.name || "Guest"}
  </div>
  {user?.email && (
    <div className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
      {user.email}
    </div>
  )}
</div>

          </button>
        </div>
      </div>
    </div>
  );
}
