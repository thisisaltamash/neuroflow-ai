import { requireAdminSession } from "@/lib/admin";
import { connectDB } from "@/lib/db";
import { errorResponse, successResponse } from "@/lib/http";
import { Booking } from "@/models/Booking";
import { Contact } from "@/models/Contact";
import { Lead } from "@/models/Lead";

function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getMonthEnd(start: Date) {
  return new Date(start.getFullYear(), start.getMonth() + 1, 1);
}

function growthDelta(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

function monthLabel(date: Date) {
  return new Intl.DateTimeFormat("en-IN", { month: "short" }).format(date);
}

export async function GET() {
  try {
    const session = await requireAdminSession();
    if (!session) return errorResponse("Unauthorized", 401);

    await connectDB();

    const [totalLeads, totalContacts, totalBookings] = await Promise.all([
      Lead.estimatedDocumentCount(),
      Contact.estimatedDocumentCount(),
      Booking.estimatedDocumentCount()
    ]);

    const now = new Date();
    const currentMonthStart = getMonthStart(now);
    const previousMonthStart = new Date(currentMonthStart.getFullYear(), currentMonthStart.getMonth() - 1, 1);
    const currentMonthEnd = getMonthEnd(currentMonthStart);

    const [currentLeadCount, previousLeadCount, currentBookingCount, previousBookingCount] = await Promise.all([
      Lead.countDocuments({ createdAt: { $gte: currentMonthStart, $lt: currentMonthEnd } }),
      Lead.countDocuments({ createdAt: { $gte: previousMonthStart, $lt: currentMonthStart } }),
      Booking.countDocuments({ createdAt: { $gte: currentMonthStart, $lt: currentMonthEnd } }),
      Booking.countDocuments({ createdAt: { $gte: previousMonthStart, $lt: currentMonthStart } })
    ]);

    const months = Array.from({ length: 6 }, (_, index) => {
      const start = new Date(currentMonthStart.getFullYear(), currentMonthStart.getMonth() - (5 - index), 1);
      const end = getMonthEnd(start);
      return { start, end, label: monthLabel(start) };
    });

    const trend = await Promise.all(
      months.map(async ({ start, end, label }) => {
        const [leads, bookings] = await Promise.all([
          Lead.countDocuments({ createdAt: { $gte: start, $lt: end } }),
          Booking.countDocuments({ createdAt: { $gte: start, $lt: end } })
        ]);

        return { month: label, leads, bookings };
      })
    );

    const [leadStatus, contactStatus, bookingStatus] = await Promise.all([
      Lead.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Contact.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Booking.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }])
    ]);

    const [recentLeads, recentContacts, recentBookings] = await Promise.all([
      Lead.find({}).sort({ createdAt: -1 }).limit(6).lean(),
      Contact.find({}).sort({ createdAt: -1 }).limit(6).lean(),
      Booking.find({}).sort({ createdAt: -1 }).limit(6).lean()
    ]);

    const activity = [
      ...recentLeads.map((item) => ({
        id: String(item._id),
        type: "Lead",
        name: item.name,
        email: item.email,
        status: item.status,
        createdAt: item.createdAt
      })),
      ...recentContacts.map((item) => ({
        id: String(item._id),
        type: "Contact",
        name: item.name,
        email: item.email,
        status: item.status,
        createdAt: item.createdAt
      })),
      ...recentBookings.map((item) => ({
        id: String(item._id),
        type: "Booking",
        name: item.name,
        email: item.email,
        status: item.status,
        createdAt: item.createdAt
      }))
    ]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 12);

    return successResponse({
      stats: {
        totalLeads,
        totalContacts,
        totalBookings,
        inquiryGrowth: growthDelta(currentLeadCount, previousLeadCount),
        bookingGrowth: growthDelta(currentBookingCount, previousBookingCount)
      },
      trend,
      pipelines: {
        leads: leadStatus,
        contacts: contactStatus,
        bookings: bookingStatus
      },
      activity
    });
  } catch (error) {
    console.error("Admin overview API error:", error);
    return errorResponse("Failed to fetch overview.", 500);
  }
}
