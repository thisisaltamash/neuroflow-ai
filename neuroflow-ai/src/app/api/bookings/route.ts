import { connectDB } from "@/lib/db";
import { sendToFormspree } from "@/lib/formspree";
import { errorResponse, readJson, successResponse } from "@/lib/http";
import { sendBookingEmails } from "@/lib/mailer";
import { validateBookingPayload } from "@/lib/validators";
import { Booking } from "@/models/Booking";

export async function POST(request: Request) {
  try {
    const payload = await readJson(request);
    if (!payload) return errorResponse("Invalid JSON payload.", 400);

    const validated = validateBookingPayload(payload);
    if (!validated.success) return errorResponse(validated.error, 400);

    sendToFormspree("booking", validated.data).catch((error) => {
      console.error("Booking Formspree forward error:", error);
    });

    await connectDB();
    const booking = await Booking.create(validated.data);

    sendBookingEmails(validated.data).catch((error) => {
      console.error("Booking email error:", error);
    });

    return successResponse({ success: true, booking }, 201);
  } catch (error) {
    console.error("Booking API error:", error);
    if (error instanceof Error) {
      if (error.message.includes("MONGODB_URI")) {
        return errorResponse(error.message, 500);
      }

      if (process.env.NODE_ENV !== "production") {
        return errorResponse(`Failed to create booking: ${error.message}`, 500);
      }
    }

    return errorResponse("Failed to create booking.", 500);
  }
}
