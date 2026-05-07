import { Schema, model, models } from "mongoose";
import type { BookingStatus } from "@/types/domain";

export interface BookingDocument {
  name: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  meetingPurpose: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<BookingDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    businessType: { type: String, required: true, trim: true },
    meetingPurpose: { type: String, required: true, trim: true },
    preferredDate: { type: String, required: true, trim: true },
    preferredTime: { type: String, required: true, trim: true },
    notes: { type: String, trim: true },
    status: { type: String, enum: ["new", "scheduled", "completed", "cancelled"], default: "new" }
  },
  { timestamps: true }
);

bookingSchema.index({ createdAt: -1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ preferredDate: 1 });

export const Booking = models.Booking || model<BookingDocument>("Booking", bookingSchema);
