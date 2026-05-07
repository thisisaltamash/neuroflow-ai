import { connectDB } from "@/lib/db";
import { errorResponse, readJson, successResponse } from "@/lib/http";
import { sendContactEmails } from "@/lib/mailer";
import { validateContactPayload } from "@/lib/validators";
import { Contact } from "@/models/Contact";

export async function POST(request: Request) {
  try {
    const payload = await readJson(request);
    if (!payload) return errorResponse("Invalid JSON payload.", 400);

    const validated = validateContactPayload(payload);
    if (!validated.success) return errorResponse(validated.error, 400);

    await connectDB();
    const contact = await Contact.create(validated.data);

    sendContactEmails(validated.data).catch((error) => {
      console.error("Contact email error:", error);
    });

    return successResponse({ success: true, contact }, 201);
  } catch (error) {
    console.error("Contact API error:", error);
    return errorResponse("Failed to submit inquiry.", 500);
  }
}
