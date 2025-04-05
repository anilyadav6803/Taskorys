import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDb } from "@/helper/db";
import { User } from "@/models/users";

export async function GET() {
  try {
    // 1. Connect to MongoDB
    await connectDb();

    // 2. Await cookies() call (Next.js 14+ behavior)
    const cookieStore = await cookies(); // ✅ await required here
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Token missing in cookies" }, { status: 401 });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) {
      return NextResponse.json({ error: "Invalid token structure" }, { status: 401 });
    }

    // 4. Find user
    const user = await User.findById(decoded.id).select("-password -__v");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 5. Return sanitized user
    return NextResponse.json({ user }, { status: 200 });

  } catch (error) {
    console.error("JWT verification or DB error:", error.message);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
