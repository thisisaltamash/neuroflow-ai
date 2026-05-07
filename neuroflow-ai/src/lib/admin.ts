import type { FilterQuery } from "mongoose";
import { BOOKING_STATUS_OPTIONS, STATUS_OPTIONS } from "@/lib/constants";
import { getAdminSession } from "@/lib/auth";
import type { BookingDocument } from "@/models/Booking";
import type { ContactDocument } from "@/models/Contact";
import type { LeadDocument } from "@/models/Lead";

export async function requireAdminSession() {
  return getAdminSession();
}

export function buildInquiryQuery<T extends LeadDocument | ContactDocument>(q: string, status: string) {
  const query: FilterQuery<T> = {};

  if (status && status !== "all" && STATUS_OPTIONS.includes(status as (typeof STATUS_OPTIONS)[number])) {
    query.status = status;
  }

  if (q) {
    query.$or = [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { company: { $regex: q, $options: "i" } },
      { serviceInterested: { $regex: q, $options: "i" } }
    ];
  }

  return query;
}

export function buildBookingQuery(q: string, status: string) {
  const query: FilterQuery<BookingDocument> = {};

  if (status && status !== "all" && BOOKING_STATUS_OPTIONS.includes(status as (typeof BOOKING_STATUS_OPTIONS)[number])) {
    query.status = status;
  }

  if (q) {
    query.$or = [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { company: { $regex: q, $options: "i" } },
      { meetingPurpose: { $regex: q, $options: "i" } }
    ];
  }

  return query;
}
