"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) return <p>Not logged in</p>;

  return (
    <div className="p-6">
      <h1>Welcome {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
      <img src={session.user.image} alt="Profile" className="w-20 h-20 rounded-full mt-2" />
    </div>
  );
}
