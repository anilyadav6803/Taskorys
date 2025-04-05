"use client";
import { signIn, signOut, useSession } from "next-auth/react";


export default function AuthButtons() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-4">
      {session ? (
        <div className="flex items-center gap-3 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-sm">
          <p className="text-sm font-medium">
            👋 Signed in as <span className="font-semibold">{session.user?.email}</span>
          </p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded transition"
          >
            Sign out
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
         
          <span className="text-sm font-medium">Sign in with Google</span>
        </button>
      )}
    </div>
  );
}
