import { Schema, model, models } from "mongoose";
import type { InquiryStatus } from "@/types/domain";

export interface ContactDocument {
  name: string;
  email: string;
  company: string;
  phone: string;
  serviceInterested: string;
  message: string;
  status: InquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<ContactDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    serviceInterested: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["new", "in_progress", "won", "lost"], default: "new" }
  },
  { timestamps: true }
);

contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1 });
contactSchema.index({ email: 1 });

export const Contact = models.Contact || model<ContactDocument>("Contact", contactSchema);
