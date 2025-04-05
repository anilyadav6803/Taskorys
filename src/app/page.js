"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FaTasks, FaUser, FaSignOutAlt, FaPlusCircle } from "react-icons/fa";

export default function HomePage() {
  const { data: session } = useSession();
  const [customUser, setCustomUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await fetch("/api/current");
      const data = await res.json();
      if (data?.user) setCustomUser(data.user);
    };

    if (!session) fetchCurrentUser();
  }, [session]);

  const user = session?.user || customUser;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-3xl text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-400 rounded-full opacity-30 blur-3xl z-0"></div>

        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 z-10 relative">
          👋 Welcome to Your Dashboard
        </h1>
        <p className="text-gray-600 mb-6 text-lg z-10 relative">
          Manage your tasks, profile and everything in one place.
        </p>

        {/* User Info */}
        {user && (
          <div className="z-10 relative mb-8">
            {user.image && (
              <img
                src={user.image}
                alt="Profile"
                className="mx-auto w-20 h-20 rounded-full border-4 border-indigo-300 mb-3"
              />
            )}
            <p className="text-xl font-semibold text-gray-800">
              {user.name || "User"}
            </p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 z-10 relative">
          <Link
            href="/tasks"
            className="bg-indigo-600 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow hover:bg-indigo-700 transition"
          >
            <FaTasks /> View Tasks
          </Link>
          <Link
            href="/profile"
            className="bg-green-500 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow hover:bg-green-600 transition"
          >
            <FaUser /> Profile
          </Link>
          <Link
            href="/tasks/new"
            className="bg-blue-500 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow hover:bg-blue-600 transition"
          >
            <FaPlusCircle /> Add Task
          </Link>
          <button
            onClick={() => {
              if (session) {
                signOut();
              } else {
                document.cookie = "token=; Max-Age=0; path=/";
                window.location.href = "/login";
              }
            }}
            className="bg-red-500 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow hover:bg-red-600 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Footer Info */}
        <div className="text-sm text-gray-400 mt-10 z-10 relative">
          Need help? Contact support@yourapp.com
        </div>
      </div>
    </main>
  );
}
