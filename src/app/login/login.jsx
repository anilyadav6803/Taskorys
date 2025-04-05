"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import GoogleSignInButton from "../components/gbutton"; // Google login button
import UserContext from "../api/context/usercontext"; // User context

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Login
      const response = await axios.post("/api/login", credentials);
      toast.success("Login successful!");
      console.log("Login response:", response.data);

      // Step 2: Fetch user info
      const currentRes = await axios.get("/api/current", {
        withCredentials: true,
      });
      setUser(currentRes.data.user);

      // Step 3: Redirect
      router.push("/");

    } catch (error) {
      toast.error("Invalid email or password.");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-400 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-green-400 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 p-2 rounded-lg hover:bg-blue-600 transition flex justify-center items-center"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Google Login */}
        <div className="mt-6  ">
          <GoogleSignInButton />
        </div>

        <p className="text-center mt-4">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
