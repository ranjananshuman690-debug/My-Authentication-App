"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

const navItems = [
  { href: "/dashboard", icon: "🌐", label: "Dashboard" },
  { href: "/Home",      icon: "🏠", label: "Home" },
  { href: "/About",     icon: "ℹ️",  label: "About" },
  { href: "/Services",  icon: "⚙️",  label: "Services" },
  { href: "/profile",   icon: "👤", label: "Profile" },
];

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""} ${mobileOpen ? "sidebar-mobile-open" : ""}`}>
      <div className="sidebar-top">
        <div className="sidebar-brand">
          {!collapsed && <span className="sidebar-brand-text">🔐 SecureAuth</span>}
        </div>
        <button className="sidebar-toggle" onClick={() => { setCollapsed(!collapsed); setMobileOpen(false); }}>
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-avatar">{user?.name?.[0]?.toUpperCase() || "U"}</div>
        {!collapsed && (
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.name}</div>
            <div className="sidebar-user-email">{user?.email}</div>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={`sidebar-link ${pathname === href ? "sidebar-link-active" : ""}`}
          >
            <span className="sidebar-link-icon">{icon}</span>
            {!collapsed && <span className="sidebar-link-label">{label}</span>}
          </Link>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className="sidebar-theme-btn" onClick={toggleTheme} title="Toggle theme">
          <span className="sidebar-link-icon">{theme === "dark" ? "☀️" : "🌙"}</span>
          {!collapsed && <span className="sidebar-link-label">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
        </button>
      </div>
    </aside>
  );
}
