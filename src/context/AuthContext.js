"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authApi } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveAuth = ({ user, accessToken }) => {
    setUser(user);
    setAccessToken(accessToken);
  };

  const logout = useCallback(async () => {
    await authApi.logout().catch(() => {});
    setUser(null);
    setAccessToken(null);
  }, []);

  useEffect(() => {
    authApi
      .refresh()
      .then(saveAuth)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, saveAuth, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
