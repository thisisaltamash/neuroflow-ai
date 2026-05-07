import { connectDB } from "@/lib/db";
import { errorResponse, successResponse } from "@/lib/http";
import { ensureSeedCollections } from "@/lib/seed";
import { Service } from "@/models/Service";

export async function GET() {
  try {
    await connectDB();
    await ensureSeedCollections();
    const services = await Service.find({}).sort({ createdAt: 1 }).lean();
    return successResponse({ services });
  } catch (error) {
    console.error("Services API error:", error);
    return errorResponse("Failed to fetch services.", 500);
  }
}
