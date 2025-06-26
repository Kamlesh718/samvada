import { verifyJwt } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }

  const decoded = await verifyJwt(token);

  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }

  return NextResponse.json({ user: decoded });
}
