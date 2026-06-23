"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import React from "react"

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <DashboardLayout>
      <div className="page-home fade-in">

        <div className="home-hero">
          <div className="home-hero-icon">🏠</div>
          <h1 className="page-title">Welcome to Home Section</h1>
          <p className="page-subtitle">Your smart authentication platform powered by modern security</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card purple">
            <div className="stat-icon purple">🔐</div>
            <div className="stat-value">Secure Login</div>
            <div className="stat-label">JWT + Refresh Token based authentication system</div>
          </div>
          <div className="stat-card green">
            <div className="stat-icon green">⚡</div>
            <div className="stat-value">Fast & Reliable</div>
            <div className="stat-label">Optimized backend with Express.js and MongoDB</div>
          </div>
          <div className="stat-card blue">
            <div className="stat-icon blue">🛡️</div>
            <div className="stat-value">Protected Routes</div>
            <div className="stat-label">Role-based access control for every user</div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">🚀 Getting Started</div>
          <div className="home-steps">
            <div className="home-step">
              <span className="home-step-num">1</span>
              <p>Create your account on the Register page</p>
            </div>
            <div className="home-step">
              <span className="home-step-num">2</span>
              <p>Login with your credentials securely</p>
            </div>
            <div className="home-step">
              <span className="home-step-num">3</span>
              <p>Access your personalized dashboard</p>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}

