import { Schema, model, models } from "mongoose";

export type LeadStatus = "new" | "contacted" | "closed";

export interface LeadDocument {
  name: string;
  phone: string;
  email: string;
  clinicName: string;
  message: string;
  createdAt: Date;
  status: LeadStatus;
}

const leadSchema = new Schema<LeadDocument>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    clinicName: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Lead = models.Lead || model<LeadDocument>("Lead", leadSchema);
