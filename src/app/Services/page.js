"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import React from "react"

export default function Services() {
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
          <div className="home-hero-icon">⚙️</div>
          <h1 className="page-title">Our Services</h1>
          <p className="page-subtitle">Everything you need to build a secure authentication system</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card purple">
            <div className="stat-icon purple">🛒</div>
            <div className="stat-value">Authentication</div>
            <div className="stat-label">Secure login & register with JWT token management</div>
          </div>
          <div className="stat-card green">
            <div className="stat-icon green">🚛</div>
            <div className="stat-value">Token Refresh</div>
            <div className="stat-label">Auto token rotation with replay attack detection</div>
          </div>
          <div className="stat-card blue">
            <div className="stat-icon blue">👮</div>
            <div className="stat-value">Role Management</div>
            <div className="stat-label">Admin and user roles with protected route access</div>
          </div>
          <div className="stat-card orange">
            <div className="stat-icon orange">🍪</div>
            <div className="stat-value">Cookie Security</div>
            <div className="stat-label">HttpOnly cookies with SameSite XSS protection</div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">📦 What's Included</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
            <div className="info-box">
              <h4 style={{ marginBottom: 8, color: "var(--accent)" }}>Security Features</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                • Password hashing with bcrypt<br />
                • JWT access token (15 min expiry)<br />
                • Refresh token (7 day expiry)<br />
                • Token family revocation
              </p>
            </div>
            <div className="info-box">
              <h4 style={{ marginBottom: 8, color: "var(--accent)" }}>Developer Friendly</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                • Clean folder structure<br />
                • Reusable components<br />
                • Easy to extend & customize<br />
                • Well documented codebase
              </p>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}

