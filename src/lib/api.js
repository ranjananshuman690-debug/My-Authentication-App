const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const request = async (path, options = {}) => {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    credentials: "include",
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

export const authApi = {
  register: (body) => request("/api/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) => request("/api/auth/login", { method: "POST", body: JSON.stringify(body) }),
  logout: () => request("/api/auth/logout", { method: "POST" }),
  refresh: () => request("/api/auth/refresh", { method: "POST" }),
  getProfile: (token) => request("/api/auth/profile", { headers: { Authorization: `Bearer ${token}` } }),
  updateProfile: (body, token) => request("/api/auth/profile", { method: "PUT", body: JSON.stringify(body), headers: { Authorization: `Bearer ${token}` } }),
};
