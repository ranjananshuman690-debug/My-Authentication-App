"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import React from "react"
import DashboardLayout from "@/components/DashboardLayout";

export default function About() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <DashboardLayout>
      <div className="fade-in">

        <div className="home-hero">
          <div className="home-hero-icon">👥</div>
          <h1 className="page-title">About Us</h1>
          <p className="page-subtitle">We build secure, modern and scalable web applications</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card purple">
            <div className="stat-icon purple">🎯</div>
            <div className="stat-value">Our Mission</div>
            <div className="stat-label">To provide developers with a clean and secure authentication boilerplate</div>
          </div>
          <div className="stat-card green">
            <div className="stat-icon green">💡</div>
            <div className="stat-value">Our Vision</div>
            <div className="stat-label">Making security simple and accessible for every developer</div>
          </div>
          <div className="stat-card orange">
            <div className="stat-icon orange">🌍</div>
            <div className="stat-value">Our Reach</div>
            <div className="stat-label">Built to scale globally with modern web technologies</div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">🛠️ Tech Stack</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
            <div className="info-box">
              <h4 style={{ marginBottom: 8, color: "var(--accent)" }}>Frontend</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                • Next.js 14 (App Router)<br />
                • React.js with Hooks<br />
                • Tailwind CSS + Custom CSS<br />
                • Context API for state management
              </p>
            </div>
            <div className="info-box">
              <h4 style={{ marginBottom: 8, color: "var(--accent)" }}>Backend</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                • Node.js with Express.js<br />
                • MongoDB with Mongoose<br />
                • JWT Access & Refresh Tokens<br />
                • HttpOnly Cookie Security
              </p>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}

