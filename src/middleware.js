import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  console.log("✅ Middleware triggered");

  const { pathname } = request.nextUrl;
  const protectedRoutes = ["/tasks", "/showtasks", "/users", "/profile"];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  let validToken = false;

  // 1️⃣ Check for NextAuth session token
  const nextAuthToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (nextAuthToken) {
    console.log("🔐 Valid NextAuth session found");
    validToken = true;
  } else {
    // 2️⃣ Check custom JWT from cookie (manual login)
    const token = request.cookies.get("token")?.value;

    if (token) {
      try {
        // Decode base64 payload from JWT
        const payloadBase64 = token.split(".")[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);

        const currentTime = Math.floor(Date.now() / 1000);

        if (payload?.exp > currentTime) {
          console.log("🔐 Valid custom JWT token");
          validToken = true;
        } else {
          console.log("⏳ Token expired");
        }
      } catch (err) {
        console.log("❌ Error decoding JWT token:", err.message);
      }
    }
  }

  // 3️⃣ If trying to access protected route without valid token
  if (isProtectedRoute && !validToken) {
    console.log("🚫 No valid token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4️⃣ If already logged in, prevent going to /login or /signup
  if (validToken && ["/login", "/signup"].includes(pathname)) {
    console.log("🔄 Redirecting logged-in user to home");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/tasks/:path*",
    "/showtasks/:path*",
    "/users/:path*",
    "/profile/:path*",
    "/login",
    "/signup",
  ],
};
