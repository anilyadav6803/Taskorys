"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import UserContext from "./usercontext";

async function currentUser() {
  try {
    const res = await fetch("/api/current", {
      method: "GET",
      credentials: "include", // Include cookies in the request
    });

    if (!res.ok) {
      throw new Error("Failed to fetch current user");
    }

    const data = await res.json();
    return data.user;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    if (["/login", "/signup"].includes(pathname)) {
      setUser(null);
      return;
    }

    const loadUser = async () => {
      try {
        const tempUser = await currentUser();

        if (tempUser?.email) {
          console.log("Fetched user:", tempUser);
          setUser(tempUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        if (pathname !== "/") {
          toast.error("Error loading current user");
        }
        setUser(null);
      }
    };

    loadUser();
  }, [pathname]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
