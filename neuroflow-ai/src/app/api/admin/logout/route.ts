import { clearAdminAuthCookie } from "@/lib/auth";
import { successResponse } from "@/lib/http";

export async function POST() {
  await clearAdminAuthCookie();
  return successResponse({ success: true });
}
