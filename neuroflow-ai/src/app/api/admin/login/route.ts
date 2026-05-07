import { NextResponse } from "next/server";
import { adminCookieName, signAdminToken, verifyAdminCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const ok = await verifyAdminCredentials(email, password);

  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const token = signAdminToken({ email });
  const res = NextResponse.json({ success: true });
  res.cookies.set(adminCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 2
  });
  return res;
}
