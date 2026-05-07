import { buildInquiryQuery, requireAdminSession } from "@/lib/admin";
import { STATUS_OPTIONS } from "@/lib/constants";
import { connectDB } from "@/lib/db";
import { errorResponse, parsePagination, readJson, successResponse } from "@/lib/http";
import { validateTextStatus } from "@/lib/validators";
import { Lead } from "@/models/Lead";

export async function GET(request: Request) {
  try {
    const session = await requireAdminSession();
    if (!session) return errorResponse("Unauthorized", 401);

    await connectDB();

    const { q, status, page, limit } = parsePagination(request.url);
    const query = buildInquiryQuery(q, status);

    const [total, leads] = await Promise.all([
      Lead.countDocuments(query),
      Lead.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
    ]);

    return successResponse({
      items: leads,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit))
      }
    });
  } catch (error) {
    console.error("Admin leads fetch error:", error);
    return errorResponse("Failed to fetch leads.", 500);
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
    const lead = await Lead.findByIdAndUpdate(
      payload.id,
      { status: statusValidation.data },
      { new: true }
    ).lean();

    if (!lead) return errorResponse("Lead not found.", 404);

    return successResponse({ success: true, item: lead });
  } catch (error) {
    console.error("Admin lead update error:", error);
    return errorResponse("Failed to update lead.", 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await requireAdminSession();
    if (!session) return errorResponse("Unauthorized", 401);

    const payload = await readJson<{ id?: string }>(request);
    if (!payload?.id) return errorResponse("id is required.", 400);

    await connectDB();
    const deleted = await Lead.findByIdAndDelete(payload.id).lean();
    if (!deleted) return errorResponse("Lead not found.", 404);

    return successResponse({ success: true });
  } catch (error) {
    console.error("Admin lead delete error:", error);
    return errorResponse("Failed to delete lead.", 500);
  }
}
