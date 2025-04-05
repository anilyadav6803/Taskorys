"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Loader2, UserPlus } from "lucide-react";
import GoogleSignInButton from "../components/gbutton"; // ✅ Import Google button

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/users", user);
      console.log("Signup response:", res.data);
      toast.success("Signup successful!", { position: "top-right" });
      setUser({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed!", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-green-400 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-white/50"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label className="block text-green-400 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-white/50"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block text-green-400 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-white/50"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full flex items-center justify-center gap-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" /> Signing Up...
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" /> Sign Up
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-2">
        <hr className="flex-grow border-gray-700" />
        <span className="text-gray-400 text-sm">OR</span>
        <hr className="flex-grow border-gray-700" />
      </div>

      {/* ✅ Google Sign Up Button */}
      <GoogleSignInButton text="Sign up with Google" />
    </div>
  );
}
