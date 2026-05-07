import { buildBookingQuery, requireAdminSession } from "@/lib/admin";
import { BOOKING_STATUS_OPTIONS } from "@/lib/constants";
import { connectDB } from "@/lib/db";
import { errorResponse, parsePagination, readJson, successResponse } from "@/lib/http";
import { validateTextStatus } from "@/lib/validators";
import { Booking } from "@/models/Booking";

export async function GET(request: Request) {
  try {
    const session = await requireAdminSession();
    if (!session) return errorResponse("Unauthorized", 401);

    await connectDB();

    const { q, status, page, limit } = parsePagination(request.url);
    const query = buildBookingQuery(q, status);

    const [total, bookings] = await Promise.all([
      Booking.countDocuments(query),
      Booking.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
    ]);

    return successResponse({
      items: bookings,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit))
      }
    });
  } catch (error) {
    console.error("Admin bookings fetch error:", error);
    return errorResponse("Failed to fetch bookings.", 500);
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await requireAdminSession();
    if (!session) return errorResponse("Unauthorized", 401);

    const payload = await readJson<{ id?: string; status?: string }>(request);
    if (!payload?.id || !payload.status) return errorResponse("id and status are required.", 400);

    const statusValidation = validateTextStatus(payload.status, BOOKING_STATUS_OPTIONS);
    if (!statusValidation.success) return errorResponse(statusValidation.error, 400);

    await connectDB();
    const booking = await Booking.findByIdAndUpdate(
      payload.id,
      { status: statusValidation.data },
      { new: true }
    ).lean();

    if (!booking) return errorResponse("Booking not found.", 404);

    return successResponse({ success: true, item: booking });
  } catch (error) {
    console.error("Admin booking update error:", error);
    return errorResponse("Failed to update booking.", 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await requireAdminSession();
    if (!session) return errorResponse("Unauthorized", 401);

    const payload = await readJson<{ id?: string }>(request);
    if (!payload?.id) return errorResponse("id is required.", 400);

    await connectDB();
    const deleted = await Booking.findByIdAndDelete(payload.id).lean();
    if (!deleted) return errorResponse("Booking not found.", 404);

    return successResponse({ success: true });
  } catch (error) {
    console.error("Admin booking delete error:", error);
    return errorResponse("Failed to delete booking.", 500);
  }
}
