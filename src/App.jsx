// استيراد useState من React
// نستخدمه لإنشاء حالة (state) داخل المكوّن والتحكم فيها
import { useState } from "react";

// استيراد أدوات التوجيه (Routing) من react-router-dom
// Routes: حاوية لجميع المسارات
// Route: تعريف مسار معين
// Navigate: إعادة التوجيه من مسار إلى مسار آخر
import { Routes, Route, Navigate } from "react-router-dom";

// استيراد مكوّنات الواجهة
// SidebarLayout: layout عام يحتوي سايدبار + توب بار + محتوى
import SidebarLayout from "./components/SidebarLayout";

// Sidebar: مكوّن السايدبار
import Sidebar from "./components/Sidebar";

// TopNav: مكوّن الشريط العلوي
import TopNav from "./components/TopNav";

// استيراد صفحات التطبيق
import Orders from "./pages/Orders";
import Overview from "./pages/Overview";
import Events from "./pages/Events";
import Settings from "./pages/Settings";

// المكوّن الرئيسي للتطبيق
export default function App() {

  // حالة للتحكم في هل السايدبار مفتوح أو مغلق
  // true يعني مفتوح افتراضيًا
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    // SidebarLayout هو الهيكل العام للتطبيق
    // نمرر له السايدبار، التوب بار، وحالة السايدبار
    <SidebarLayout
      // هنا نحدد مكوّن السايدبار نفسه
      sidebar={<Sidebar />}

      // هنا نحدد التوب بار
      // نمرر له حالة السايدبار ودالة التبديل
      topbar={
        <TopNav
          // نرسل حالة السايدبار الحالية
          sidebarOpen={sidebarOpen}

          // دالة لتغيير حالة السايدبار (فتح/إغلاق)
          // استخدمنا الشكل (v) => !v عشان نعكس القيمة الحالية
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />
      }

      // نمرر حالة السايدبار للـ layout
      sidebarOpen={sidebarOpen}

      // نمرر دالة تغيير الحالة في حال احتاجها layout
      setSidebarOpen={setSidebarOpen}
    >
      {/* Routes يحتوي جميع مسارات التطبيق */}
      <Routes>

        {/* الصفحة الرئيسية */}
        <Route path="/" element={<Overview />} />

        {/* صفحة الأحداث */}
        <Route path="/events" element={<Events />} />

        {/* أي مسار غير معروف */}
        {/* يتم إعادة التوجيه للصفحة الرئيسية */}
        <Route path="*" element={<Navigate to="/" replace />} />

        {/* صفحة الدعم */}
        <Route path="/support" element={<div>Support page</div>} />

        {/* صفحة سجل التغييرات */}
        <Route path="/changelog" element={<div>Changelog page</div>} />

        {/* صفحة الطلبات */}
        <Route path="/orders" element={<Orders/>} />

        {/* صفحة الإعدادات */}
        <Route path="/settings" element={<Settings/>} />
      </Routes>
    </SidebarLayout>
  );
}
