import { buildInquiryQuery, requireAdminSession } from "@/lib/admin";
import { STATUS_OPTIONS } from "@/lib/constants";
import { connectDB } from "@/lib/db";
import { errorResponse, parsePagination, readJson, successResponse } from "@/lib/http";
import { validateTextStatus } from "@/lib/validators";
import { Contact } from "@/models/Contact";

export async function GET(request: Request) {
  try {
    const session = await requireAdminSession();
    if (!session) return errorResponse("Unauthorized", 401);

    await connectDB();

    const { q, status, page, limit } = parsePagination(request.url);
    const query = buildInquiryQuery(q, status);

    const [total, contacts] = await Promise.all([
      Contact.countDocuments(query),
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
    ]);

    return successResponse({
      items: contacts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit))
      }
    });
  } catch (error) {
    console.error("Admin contacts fetch error:", error);
    return errorResponse("Failed to fetch contacts.", 500);
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await requireAdminSession();
    if (!session) return errorResponse("Unauthorized", 401);

    const payload = await readJson<{ id?: string; status?: string }>(request);
    if (!payload?.id || !payload.status) return errorResponse("id and status are required.", 400);

    const statusValidation = validateTextStatus(payload.status, STATUS_OPTIONS);
    if (!statusValidation.success) return errorResponse(statusValidation.error, 400);

    await connectDB();
    const contact = await Contact.findByIdAndUpdate(
      payload.id,
      { status: statusValidation.data },
      { new: true }
    ).lean();

    if (!contact) return errorResponse("Contact not found.", 404);

    return successResponse({ success: true, item: contact });
  } catch (error) {
    console.error("Admin contact update error:", error);
    return errorResponse("Failed to update contact.", 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await requireAdminSession();
    if (!session) return errorResponse("Unauthorized", 401);

    const payload = await readJson<{ id?: string }>(request);
    if (!payload?.id) return errorResponse("id is required.", 400);

    await connectDB();
    const deleted = await Contact.findByIdAndDelete(payload.id).lean();
    if (!deleted) return errorResponse("Contact not found.", 404);

    return successResponse({ success: true });
  } catch (error) {
    console.error("Admin contact delete error:", error);
    return errorResponse("Failed to delete contact.", 500);
  }
}
