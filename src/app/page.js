"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="home-page">
      <div className="home-card">
        <div className="auth-icon">🔐</div>
        <div className="home-header">
          <h1 className="home-title">Welcome</h1>
          <p className="home-subtitle">A minimal authentication system</p>
        </div>

        {!loading && (
          <div className="home-actions">
            {user ? (
              <>
                <p className="home-user-text">
                  Signed in as <span className="home-user-name">{user.name}</span>
                </p>
                <Link href="/success" className="auth-btn home-btn-block">Go to Dashboard</Link>
                <button onClick={handleLogout} className="home-btn-outline">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="auth-btn home-btn-block">Sign In</Link>
                <Link href="/register" className="home-btn-outline">Create Account</Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
