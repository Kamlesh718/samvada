import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged Out" });

  response.cookies.delete("token");
  return response;
}
