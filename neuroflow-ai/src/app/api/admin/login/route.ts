import { comparePassword, setAdminAuthCookie, signAdminToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { errorResponse, readJson, successResponse } from "@/lib/http";
import { sendAdminLoginAlert } from "@/lib/mailer";
import { ensureDefaultAdmin } from "@/lib/seed";
import { validateAdminLoginPayload } from "@/lib/validators";
import { Admin } from "@/models/Admin";

export async function POST(request: Request) {
  try {
    const payload = await readJson(request);
    if (!payload) return errorResponse("Invalid JSON payload.", 400);

    const validated = validateAdminLoginPayload(payload);
    if (!validated.success) return errorResponse(validated.error, 400);

    await connectDB();
    await ensureDefaultAdmin();

    const admin = await Admin.findOne({ email: validated.data.email });
    if (!admin) return errorResponse("Invalid credentials.", 401);

    const passwordMatches = await comparePassword(validated.data.password, admin.passwordHash);
    if (!passwordMatches) return errorResponse("Invalid credentials.", 401);

    const token = signAdminToken({
      adminId: String(admin._id),
      email: admin.email,
      role: admin.role
    });

    await setAdminAuthCookie(token);

    admin.lastLoginAt = new Date();
    await admin.save();

    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "Unknown";
    const userAgent = request.headers.get("user-agent") || "Unknown";

    sendAdminLoginAlert({
      email: admin.email,
      ipAddress,
      userAgent,
      loginAt: admin.lastLoginAt.toISOString()
    }).catch((error) => {
      console.error("Admin login alert email error:", error);
    });

    return successResponse({
      success: true,
      admin: {
        id: String(admin._id),
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role
      }
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return errorResponse("Failed to login.", 500);
  }
}
