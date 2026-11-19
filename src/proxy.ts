import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, SESSION_COOKIE } from "@/lib/auth";
import { SITE_URL } from "@/lib/seo";

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host");
  if (host?.startsWith("www.")) {
    const dest = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      SITE_URL,
    );
    return NextResponse.redirect(dest, 308);
  }

  const { pathname } = request.nextUrl;

  // Only guard the admin dashboard (login page stays public).
  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname === "/admin/login";

  if (!isAdmin || isLogin) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifyToken(token) : null;

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
