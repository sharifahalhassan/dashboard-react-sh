import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SidebarLayout from "./components/SidebarLayout";
import Sidebar from "./components/SideBar";
import TopNav from "./components/TopNav";
import Orders from "./pages/Orders";
import Overview from "./pages/Overview";
import Events from "./pages/Events";
import Settings from "./pages/Settings";

export default function App() {

  // حالة للتحكم في هل السايدبار مفتوح أو مغلق
  // true يعني مفتوح افتراضيًا
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
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
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />
      }
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/events" element={<Events />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/support" element={<div>Support page</div>} />
        <Route path="/changelog" element={<div>Changelog page</div>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/settings" element={<Settings/>} />
      </Routes>

    </SidebarLayout>
  );
}
