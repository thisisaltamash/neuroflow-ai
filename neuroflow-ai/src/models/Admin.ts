import { Schema, model, models } from "mongoose";

export interface AdminDocument {
  email: string;
  fullName: string;
  passwordHash: string;
  role: "super_admin";
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<AdminDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["super_admin"], default: "super_admin" },
    lastLoginAt: { type: Date }
  },
  { timestamps: true }
);

export const Admin = models.Admin || model<AdminDocument>("Admin", adminSchema);
