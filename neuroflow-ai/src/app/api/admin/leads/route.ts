import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { Lead } from "@/models/Lead";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const status = searchParams.get("status") || "";

  await connectDB();
  const query: Record<string, unknown> = {};
  if (status && status !== "all") query.status = status;
  if (q) {
    query.$or = [{ name: { $regex: q, $options: "i" } }, { email: { $regex: q, $options: "i" } }, { clinicName: { $regex: q, $options: "i" } }];
  }

  const leads = await Lead.find(query).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ leads });
}

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status } = await request.json();

  if (!id || !status) return NextResponse.json({ error: "id and status required." }, { status: 400 });
  await connectDB();
  const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });
  return NextResponse.json({ lead });
}
