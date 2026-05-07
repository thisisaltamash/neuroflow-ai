import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Lead } from "@/models/Lead";
import { sendLeadConfirmationEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, clinicName, message } = body;

    if (!name || !phone || !email || !clinicName || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    await connectDB();
    const lead = await Lead.create({ name, phone, email, clinicName, message });

    sendLeadConfirmationEmail(email, name).catch((e) => console.error("Email error:", e));

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create lead." }, { status: 500 });
  }
}
