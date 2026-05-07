import { DEFAULT_ADMIN_EMAIL } from "@/lib/constants";
import { SERVICE_CATALOG, TESTIMONIALS } from "@/lib/content";
import { comparePassword, hashPassword, isBcryptHash } from "@/lib/auth";
import { Admin } from "@/models/Admin";
import { Service } from "@/models/Service";
import { Testimonial } from "@/models/Testimonial";

export async function ensureDefaultAdmin() {
  const email = (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase();
  const configuredPassword = process.env.ADMIN_PASSWORD || "8756@Altu";
  const fullName = process.env.ADMIN_NAME || "NeuroFlow Super Admin";

  const existing = await Admin.findOne({ email });

  if (!existing) {
    const passwordHash = isBcryptHash(configuredPassword) ? configuredPassword : await hashPassword(configuredPassword);
    await Admin.create({ email, fullName, passwordHash, role: "super_admin" });
    return;
  }

  if (isBcryptHash(configuredPassword)) {
    if (existing.passwordHash !== configuredPassword) {
      existing.passwordHash = configuredPassword;
      await existing.save();
    }
    return;
  }

  const matches = await comparePassword(configuredPassword, existing.passwordHash);
  if (!matches) {
    existing.passwordHash = await hashPassword(configuredPassword);
    await existing.save();
  }
}

export async function ensureSeedCollections() {
  const serviceCount = await Service.estimatedDocumentCount();
  if (serviceCount === 0) {
    await Service.insertMany(SERVICE_CATALOG.map((service) => ({ ...service })));
  }

  const testimonialCount = await Testimonial.estimatedDocumentCount();
  if (testimonialCount === 0) {
    await Testimonial.insertMany(TESTIMONIALS.map((testimonial) => ({ ...testimonial })));
  }
}
