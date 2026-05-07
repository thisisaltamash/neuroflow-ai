import { Schema, model, models } from "mongoose";

export interface ServiceDocument {
  slug: string;
  title: string;
  description: string;
  benefits: string[];
  workflow: string[];
  startingPrice: string;
  ctaLabel: string;
  audience: string;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<ServiceDocument>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    benefits: { type: [String], default: [] },
    workflow: { type: [String], default: [] },
    startingPrice: { type: String, required: true, trim: true },
    ctaLabel: { type: String, required: true, trim: true },
    audience: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export const Service = models.Service || model<ServiceDocument>("Service", serviceSchema);
