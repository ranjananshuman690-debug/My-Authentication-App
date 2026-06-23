"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { authApi } from "@/lib/api";

export default function ProfilePage() {
  const { user, accessToken, saveAuth, loading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (accessToken) {
      authApi.getProfile(accessToken).then((data) => {
        setProfileData(data);
        setName(data.name);
        setEmail(data.email);
      });
    }
  }, [accessToken]);

  if (loading || !user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setError(null);
    setSaving(true);
    try {
      const updated = await authApi.updateProfile({ name, email }, accessToken);
      saveAuth({ user: updated, accessToken });
      setProfileData((prev) => ({ ...prev, name: updated.name, email: updated.email }));
      setMsg("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const memberSince = profileData?.createdAt
    ? new Date(profileData.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "—";

  return (
    <DashboardLayout>
      <div className="fade-in">
        <div className="profile-banner">
          <div className="profile-banner-circle" />
          <div className="profile-banner-icon">👤</div>
          <div>
            <h1 className="profile-banner-title">My Profile</h1>
            <p className="profile-banner-subtitle">Manage your account information</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {/* Profile Info Card */}
          <div className="card">
            <div className="card-title">Account Overview</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(129,140,248,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", flexShrink: 0 }}>
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text-primary)" }}>{profileData?.name || user?.name}</div>
                  <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{profileData?.email || user?.email}</div>
                </div>
              </div>

              {[
                { label: "📧 Email", value: profileData?.email || user?.email },
                { label: "🗓️ Member Since", value: memberSince },
                { label: "✅ Account Status", value: profileData?.isActive !== false ? "Active" : "Inactive" },
              ].map(({ label, value }) => (
                <div key={label} className="info-box" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{label}</span>
                  <span style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "0.9rem" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="card">
            <div className="card-title">Edit Profile</div>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="auth-field">
                <label className="auth-label">Full Name</label>
                <input className="auth-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
              </div>
              <div className="auth-field">
                <label className="auth-label">Email</label>
                <input className="auth-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" required />
              </div>

              {msg && <div className="auth-error" style={{ background: "rgba(34,197,94,0.1)", borderColor: "rgba(34,197,94,0.3)", color: "#22c55e" }}>{msg}</div>}
              {error && <div className="auth-error">{error}</div>}

              <button type="submit" className="auth-btn" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
