import { Schema, model, models } from "mongoose";
import type { InquiryStatus } from "@/types/domain";

export interface LeadDocument {
  name: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  serviceInterested: string;
  message: string;
  source: string;
  status: InquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<LeadDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    businessType: { type: String, required: true, trim: true },
    serviceInterested: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    source: { type: String, default: "website", trim: true },
    status: { type: String, enum: ["new", "in_progress", "won", "lost"], default: "new" }
  },
  { timestamps: true }
);

leadSchema.index({ createdAt: -1 });
leadSchema.index({ status: 1 });
leadSchema.index({ email: 1 });

export const Lead = models.Lead || model<LeadDocument>("Lead", leadSchema);
