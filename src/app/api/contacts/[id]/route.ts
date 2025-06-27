import { connectToDB } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

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
