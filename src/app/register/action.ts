"use server";

import { hashPassword } from "@/lib/hash";
import { connectToDB } from "@/lib/mongoose";
import User from "@/models/User";
import { redirect } from "next/navigation";

type State = {
  error: string | null;
};

export async function registerUser(
  prevState: any,
  formData: FormData
): Promise<State> {
  await connectToDB();
  const firstName = formData.get("firstname");
  const lastName = formData.get("lastname");
  const email = formData.get("email");
  const password = formData.get("password");
  const avatarUrl = formData.get("avatarurl");

  if (!firstName || !lastName || !email || !password) {
    return { error: "All fields are required" };
  }

  if (password?.length < 8) {
    return {
      error: "Password should contain a minimum of 8 characters.",
    };
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { error: "Email already registered" };
  }

  const hashedPassword = await hashPassword(password);

  await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    avatarUrl,
  });

  redirect("/login?registered=1");
}
