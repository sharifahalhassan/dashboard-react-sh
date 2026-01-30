import { useEffect, useState } from "react"
import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import LoginModal from "./LoginModal"

export default function TopNav({ sidebarOpen, onToggleSidebar }) {
  const [loginOpen, setLoginOpen] = useState(false)
  const [user, setUser] = useState(null)

  // اقرأ المستخدم من localStorage عند تحميل التوب بار
  useEffect(() => {
    const stored = localStorage.getItem("user")
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const handleLoggedIn = () => {
    // بعد نجاح تسجيل الدخول: اقرأ المستخدم من localStorage
    const stored = localStorage.getItem("user")
    setUser(stored ? JSON.parse(stored) : null)
    setLoginOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-3">
          {/* زر التحكم في فتح/إغلاق السايدبار */}
          <button
            type="button"
            onClick={onToggleSidebar}
            className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            aria-label="Toggle sidebar"
          >
            <ChevronLeftIcon
              className={[
                "h-5 w-5 transition-transform duration-300 ease-out text-zinc-900 dark:text-zinc-50",
                sidebarOpen ? "rotate-0" : "rotate-180",
              ].join(" ")}
            />
          </button>

          <h1 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">
            Dashboard
          </h1>

          {/* عناصر الجهة اليمنى */}
          <div className="ml-auto flex items-center gap-3">
            <button className="rounded-full px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition">
              Support
            </button>

            {/* Login / Logout */}
            {!user ? (
              <button
                onClick={() => setLoginOpen(true)}
                className="rounded-xl bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white hover:bg-zinc-800 transition"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center gap-2">
                {/* اسم مختصر (اختياري) */}
                <div className="hidden sm:block text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {user.name}
                </div>

                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-zinc-300 px-4 py-1.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {loginOpen && (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onLogin={handleLoggedIn}
        />
      )}
    </header>
  )
}
