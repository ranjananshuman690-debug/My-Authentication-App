"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    const confirmed = window.confirm("Kya aap sach mein Sign Out karna chahte hain?");
    if (!confirmed) return;
    await logout();
    router.push("/");
  };

  const sidebarWidth = collapsed ? 68 : 240;

  return (
    <div className="layout-root">
      {/* Mobile overlay */}
      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="layout-body-wrap" style={{ marginLeft: sidebarWidth }}>
        <nav className="navbar" style={{ left: sidebarWidth }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)}>☰</button>
            <span className="text-sm text-green-500 text-xl">{user?.name}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-1.5 rounded-lg border border-red-400 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 cursor-pointer"
          >
            Sign Out
          </button>
        </nav>
        <main className="layout-main">{children}</main>
      </div>
    </div>
  );
}

