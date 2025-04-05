"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import UserContext from "../api/context/usercontext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
  
      if (res.ok) {
        toast.success("Logout successful", {
          position: "top-right",
        });
        
        setUser(null); // Clear user context
        window.location.href = "/login"; // Redirect to login page
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong");
    }
  };
  

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-bold">
          TodoList
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <div
          className={`absolute md:static top-16 left-0 w-full bg-blue-600 md:bg-transparent p-4 md:p-0 transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          } md:flex md:w-auto md:items-center md:justify-center md:flex-1`}
        >
          <ul className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:justify-center w-full">
            {user && (
              <>
                <li>
                  <Link
                    href="/"
                    className="block md:inline-block px-4 py-2 hover:text-gray-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tasks"
                    className="block md:inline-block px-4 py-2 hover:text-gray-200"
                  >
                    Add Tasks
                  </Link>
                </li>
                <li>
                  <Link
                    href="/showtasks"
                    className="block md:inline-block px-4 py-2 hover:text-gray-200"
                  >
                    Show Tasks
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Right-side Auth Buttons */}
       {/* Right-side Auth Buttons */}
<div className="hidden md:flex gap-4 ml-auto items-center">
  {user ? (
    <>
      <span className="text-sm font-medium mr-2">
        Welcome, {user.name || user.email || "User"}
      </span>
      <Link
        href="/profile/users"
        className="block md:inline-block px-4 py-2 hover:text-gray-200"
      >
        Profile
      </Link>
      <button
        onClick={handleLogout}
        className="block md:inline-block px-4 py-2 hover:text-gray-200"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        href="/login"
        className="block md:inline-block px-4 py-2 hover:text-gray-200"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="block md:inline-block px-4 py-2 hover:text-gray-200"
      >
        Signup
      </Link>
    </>
  )}
</div>

      </div>
    </nav>
  );
};

export default Navbar;
