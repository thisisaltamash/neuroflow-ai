import { connectDB } from "@/lib/db";
import { errorResponse, successResponse } from "@/lib/http";
import { ensureSeedCollections } from "@/lib/seed";
import { Testimonial } from "@/models/Testimonial";

export async function GET() {
  try {
    await connectDB();
    await ensureSeedCollections();
    const testimonials = await Testimonial.find({}).sort({ createdAt: 1 }).lean();
    return successResponse({ testimonials });
  } catch (error) {
    console.error("Testimonials API error:", error);
    return errorResponse("Failed to fetch testimonials.", 500);
  }
}
