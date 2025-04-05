import { connectDb } from "@/helper/db";
import { User } from "@/models/users";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDb(); // Ensure database is connected

    const { email, password } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.log("User found:", user);

    const match = bcryptjs.compareSync(password, user.password);
    if (!match) {
      return new NextResponse(JSON.stringify({ message: "Invalid password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("JWT token generated successfully:", token);

    // Create response with the token set in cookies
    const response = NextResponse.json(
      { message: "Login successful", user },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600, // 1 hour
      path: "/",
    });

    console.log("Token set in cookies successfully");

    return response;
  } catch (error) {
    console.error("Server error:", error);
    return new NextResponse(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
