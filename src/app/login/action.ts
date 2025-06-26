"use server";

import { comparePassword } from "@/lib/hash";
import { signJwt } from "@/lib/jwt";
import { connectToDB } from "@/lib/mongoose";
import User from "@/models/User";
import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

type State = {
  error?: string | null;
  success?: boolean;
};

export async function loginUser(
  prevState: any,
  formData: FormData
): Promise<State> {
  await connectToDB();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email and password are required.", success: false };
  }

  const user = await User.findOne({ email });

  if (!user) {
    return { error: "Invalid email or password.", success: false };
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    return { error: "Invalid email or password.", success: false };
  }

  const token = await signJwt({
    name: `${user.firstName} ${user.lastName}`,
    userId: user._id.toString(),
    email: user.email,
    avatarUrl: user.avatarUrl,
  });

  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  // redirect("/chat");
  return { success: true };
}
