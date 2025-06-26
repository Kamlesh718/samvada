// app/api/contacts/route.ts
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDB } from "@/lib/mongoose";
import { verifyJwt } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  await connectToDB();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = await verifyJwt(token);
  if (!decoded || !decoded.userId) {
    NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  const currentUserId = decoded.userId;

  const users = await User.find(
    { _id: { $ne: currentUserId } },
    "firstName lastName email avatarUrl"
  );

  return NextResponse.json(
    users.map((u) => ({
      id: u._id.toString(),
      name: `${u.firstName} ${u.lastName}`,
      email: u.email,
      avatarUrl: u.avatarUrl,
    }))
  );
}
