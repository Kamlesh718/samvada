"use server";

import { signJwt, verifyJwt } from "@/lib/jwt";
import { connectToDB } from "@/lib/mongoose";
import User from "@/models/User";
import { cookies } from "next/headers";

type State = {
  error: string | null;
  success?: boolean;
};

type UserUpdateFields = {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
};

export async function updateProfile(
  _prevState: State,
  formData: FormData
): Promise<State> {
  try {
    await connectToDB();

    const firstName = formData.get("firstname")?.toString().trim();
    const lastName = formData.get("lastname")?.toString().trim();
    const avatarUrl = formData.get("avatarurl")?.toString().trim();
    const avatar = formData.get("avatar")?.toString().trim();

    const token = cookies().get("token")?.value;
    if (!token) return { error: "Unauthorized" };

    const decoded = await verifyJwt(token);
    const userId = decoded?.userId;
    if (!userId) return { error: "Invalid token" };

    const update: UserUpdateFields = {};
    if (firstName) update.firstName = firstName;
    if (lastName) update.lastName = lastName;
    if (avatar) update.avatarUrl = avatarUrl;

    if (Object.keys(update).length === 0) {
      return { error: "No valid fields are provided" };
    }

    // ✅ Update the user and fetch the new values
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      update,
      { new: true } // ✅ Return the updated user
    );

    if (!updatedUser) return { error: "User not found" };

    // ✅ Create new JWT with updated data
    const newToken = await signJwt({
      userId: updatedUser._id.toString(),
      email: updatedUser.email,
      name: `${updatedUser.firstName} ${updatedUser.lastName}`,
      avatarUrl: updatedUser.avatarUrl,
    });

    // ✅ Set the new cookie
    cookies().set("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return { error: null, success: true };
  } catch (err) {
    console.error("Error updating profile:", err);
    return { error: "Something went wrong" };
  }
}
