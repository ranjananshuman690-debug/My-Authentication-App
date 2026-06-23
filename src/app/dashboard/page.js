"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);
  

  if (loading || !user) return null;
  const greeting = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening";

  const concepts = [
    { icon: "🔑", title: "JWT Access Token", status: "Active", detail: "15-minute expiry, sent via Authorization header", color: "purple" },
    { icon: "🔄", title: "Refresh Token", status: "Stored", detail: "7-day expiry, HttpOnly cookie, auto-rotation", color: "green" },
    { icon: "🍪", title: "HttpOnly Cookie", status: "Protected", detail: "XSS-proof storage, SameSite protection", color: "blue" },
    { icon: "🛡️", title: "RBAC Role", status: user?.role?.toUpperCase(), detail: `Your role: ${user?.role} — ${isAdmin ? "Full admin access" : "Standard user access"}`, color: "orange" },
    { icon: "🌐", title: "OAuth Provider", status: user?.authProvider === "google" ? "Google" : "Local", detail: `Authenticated via ${user?.authProvider || "local"} provider`, color: user?.authProvider === "google" ? "orange" : "purple" },
    { icon: "📱", title: "Session", status: "Active", detail: "Token family tracking with replay detection", color: "green" },
  ];

  return (
    <DashboardLayout>
      <div className="fade-in">
        <div className="page-header"><h1 className="page-title">{greeting}, {user?.name?.split(" ")[0]}! 👋</h1><p className="page-subtitle">Here&apos;s your security overview</p></div>
        <div className="stats-grid">
          {concepts.map((c, i) => (
            <div key={i} className={`stat-card ${c.color}`}>
              <div className={`stat-icon ${c.color}`}>{c.icon}</div>
              <div className="stat-value" style={{fontSize:"1.1rem"}}>{c.title}</div>
              <div style={{marginBottom:8}}><span className={`badge badge-${c.color === "purple" ? "admin" : c.color === "green" ? "active" : c.color === "blue" ? "user" : "google"}`}>{c.status}</span></div>
              <div className="stat-label">{c.detail}</div>
            </div>
          ))}
        </div>
        <div className="card" style={{marginTop:24}}>
          <div className="card-title">🔐 Security Concepts in This Project</div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:16}}>
            <div className="info-box">
              <h4 style={{marginBottom:8, color:"var(--accent)"}}>Token Flow</h4>
              <p style={{fontSize:"0.85rem", color:"var(--text-secondary)", lineHeight:1.7}}>1. Login → Access Token (15m) + Refresh Token (7d)<br/>2. Access Token → Authorization header<br/>3. Refresh Token → HttpOnly cookie<br/>4. On expiry → /refresh → Old invalidated, new pair issued</p>
            </div>
            <div className="info-box">
              <h4 style={{marginBottom:8, color:"var(--accent)"}}>Security Measures</h4>
              <p style={{fontSize:"0.85rem", color:"var(--text-secondary)", lineHeight:1.7}}>• <strong>XSS Protection:</strong> HttpOnly cookies<br/>• <strong>CSRF Protection:</strong> SameSite attribute<br/>• <strong>Token Rotation:</strong> Each refresh invalidates previous<br/>• <strong>Replay Detection:</strong> Family-wide revocation</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

