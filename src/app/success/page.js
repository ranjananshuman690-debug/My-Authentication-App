"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SuccessPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (loading || !user) return null;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">You're in!</h1>
          <p className="text-gray-500">
            Welcome, <span className="font-semibold text-gray-800">{user.name}</span>
          </p>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 text-left space-y-2">
          <p className="text-xs text-gray-400 uppercase font-medium tracking-wide">Account Info</p>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Name</span>
            <span className="font-medium">{user.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">{user.email}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
