import { verifyJwt } from "@/lib/jwt";
import { connectToDB } from "@/lib/mongoose";
import Message from "@/models/Message";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  await connectToDB();

  const token = req.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded = await verifyJwt(token);
  const currentUserId = decoded?.userId;
  const userId = params.userId;

  const messages = await Message.find({
    $or: [
      { senderId: currentUserId, receiverId: userId },
      { senderId: userId, receiverId: currentUserId },
    ],
  }).sort({ createdAt: 1 });

  return NextResponse.json(
    messages.map((msg) => ({
      ...msg.toObject(),
      senderId: msg.senderId.toString(),
      receiverId: msg.receiverId.toString(),
    }))
  );
}
