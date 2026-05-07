import { Schema, model, models } from "mongoose";

export interface TestimonialDocument {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  impact: string;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<TestimonialDocument>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    quote: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    impact: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

testimonialSchema.index({ createdAt: -1 });

export const Testimonial = models.Testimonial || model<TestimonialDocument>("Testimonial", testimonialSchema);
