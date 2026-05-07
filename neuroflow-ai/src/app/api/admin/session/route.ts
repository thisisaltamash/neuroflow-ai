import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { errorResponse, successResponse } from "@/lib/http";
import { Admin } from "@/models/Admin";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) return successResponse({ authenticated: false });

    await connectDB();
    const admin = await Admin.findById(session.adminId);

    if (!admin) {
      return successResponse({ authenticated: false });
    }

    return successResponse({
      authenticated: true,
      admin: {
        id: String(admin._id),
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role
      }
    });
  } catch (error) {
    console.error("Admin session error:", error);
    return errorResponse("Failed to verify session.", 500);
  }
}
