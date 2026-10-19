import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "apoorvaa_admin_session";
const SESSION_TOKEN = "hotel_apoorvaa_authenticated_admin_session_token_2026";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Obfuscate old /admin routes: Return 404 so normal users and scanners cannot guess or access
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return new NextResponse(null, { status: 404 });
  }

  // 2. Protect /admin-access root
  if (pathname === "/admin-access") {
    const sessionCookie = req.cookies.get(COOKIE_NAME);
    const isAuthenticated = sessionCookie?.value === SESSION_TOKEN;

    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin-access/menu", req.url));
    } else {
      return NextResponse.redirect(new URL("/admin-access/login", req.url));
    }
  }

  // 3. Prevent logged-in admin from having to re-login if session is active
  if (pathname === "/admin-access/login") {
    const sessionCookie = req.cookies.get(COOKIE_NAME);
    const isAuthenticated = sessionCookie?.value === SESSION_TOKEN;

    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin-access/menu", req.url));
    }
    return NextResponse.next();
  }

  // 4. Protect /admin-access/menu and all other /admin-access/* management subpaths
  if (pathname.startsWith("/admin-access/")) {
    const sessionCookie = req.cookies.get(COOKIE_NAME);
    const isAuthenticated = sessionCookie?.value === SESSION_TOKEN;

    if (!isAuthenticated) {
      const loginUrl = new URL("/admin-access/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/admin-access",
    "/admin-access/:path*",
  ],
};
