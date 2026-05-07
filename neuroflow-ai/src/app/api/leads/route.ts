import { connectDB } from "@/lib/db";
import { errorResponse, readJson, successResponse } from "@/lib/http";
import { sendLeadEmails } from "@/lib/mailer";
import { validateLeadPayload } from "@/lib/validators";
import { Lead } from "@/models/Lead";

export async function POST(request: Request) {
  try {
    const payload = await readJson(request);
    if (!payload) return errorResponse("Invalid JSON payload.", 400);

    const validated = validateLeadPayload(payload);
    if (!validated.success) return errorResponse(validated.error, 400);

    await connectDB();
    const lead = await Lead.create(validated.data);

    sendLeadEmails(validated.data).catch((error) => {
      console.error("Lead email error:", error);
    });

    return successResponse({ success: true, lead }, 201);
  } catch (error) {
    console.error("Lead API error:", error);
    return errorResponse("Failed to submit lead.", 500);
  }
}
