import { connectToDB } from "@/lib/mongoose";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: { id: string };
}

export async function GET(req: NextRequest, context: Context) {
  const { id } = context.params;

  await connectToDB();

  try {
    const user = await User.findById(id).select(
      "firstName lastName email avatarUrl"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    return NextResponse.json({
      id: user._id.toString(),
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      avatarUrl: user.avatarUrl || "/avatar.png",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }
}
