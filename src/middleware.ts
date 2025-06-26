import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/jwt";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value || null;

  // console.log("TOKEN:", token);

  if (PUBLIC_ROUTES.includes(pathname)) {
    if (token) {
      const decoded = await verifyJwt(token);
      // console.log("DECODED:", decoded);

      if (decoded) {
        return NextResponse.redirect(new URL("/chat", req.url));
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const decoded = await verifyJwt(token);
  // console.log("DECODED (protected):", decoded);

  if (!decoded) {
    const res = NextResponse.redirect(new URL("/login", req.url));

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|_next/static|_next/image|.*\\.png$).*)"],
};
