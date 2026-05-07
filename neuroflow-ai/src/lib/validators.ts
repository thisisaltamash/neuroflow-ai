import type { AdminLoginPayload, BookingPayload, ContactPayload, LeadPayload } from "@/types/domain";

type ValidationSuccess<T> = { success: true; data: T };
type ValidationFailure = { success: false; error: string };

type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

function normalize(value: unknown, max = 500): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[+()\-\s\d]{7,20}$/.test(phone);
}

function required(value: string, label: string): ValidationFailure | null {
  if (!value) return { success: false, error: `${label} is required.` };
  return null;
}

export function validateLeadPayload(payload: unknown): ValidationResult<LeadPayload> {
  const sourcePayload = (payload ?? {}) as Record<string, unknown>;

  const data: LeadPayload = {
    name: normalize(sourcePayload.name, 80),
    email: normalize(sourcePayload.email, 120).toLowerCase(),
    phone: normalize(sourcePayload.phone, 25),
    company: normalize(sourcePayload.company, 120),
    businessType: normalize(sourcePayload.businessType, 80),
    serviceInterested: normalize(sourcePayload.serviceInterested, 120),
    message: normalize(sourcePayload.message, 2000),
    source: normalize(sourcePayload.source, 40) || "website"
  };

  const requiredChecks = [
    required(data.name, "Name"),
    required(data.email, "Email"),
    required(data.phone, "Phone"),
    required(data.company, "Company"),
    required(data.businessType, "Business type"),
    required(data.serviceInterested, "Service interest"),
    required(data.message, "Message")
  ];

  const failedRequired = requiredChecks.find(Boolean);
  if (failedRequired) return failedRequired;

  if (!isValidEmail(data.email)) return { success: false, error: "Please provide a valid email address." };
  if (!isValidPhone(data.phone)) return { success: false, error: "Please provide a valid phone number." };

  return { success: true, data };
}

export function validateContactPayload(payload: unknown): ValidationResult<ContactPayload> {
  const sourcePayload = (payload ?? {}) as Record<string, unknown>;

  const data: ContactPayload = {
    name: normalize(sourcePayload.name, 80),
    email: normalize(sourcePayload.email, 120).toLowerCase(),
    company: normalize(sourcePayload.company, 120),
    phone: normalize(sourcePayload.phone, 25),
    serviceInterested: normalize(sourcePayload.serviceInterested, 120),
    message: normalize(sourcePayload.message, 2000)
  };

  const requiredChecks = [
    required(data.name, "Name"),
    required(data.email, "Email"),
    required(data.company, "Company"),
    required(data.phone, "Phone"),
    required(data.serviceInterested, "Service interest"),
    required(data.message, "Message")
  ];

  const failedRequired = requiredChecks.find(Boolean);
  if (failedRequired) return failedRequired;

  if (!isValidEmail(data.email)) return { success: false, error: "Please provide a valid email address." };
  if (!isValidPhone(data.phone)) return { success: false, error: "Please provide a valid phone number." };

  return { success: true, data };
}

export function validateBookingPayload(payload: unknown): ValidationResult<BookingPayload> {
  const sourcePayload = (payload ?? {}) as Record<string, unknown>;

  const data: BookingPayload = {
    name: normalize(sourcePayload.name, 80),
    email: normalize(sourcePayload.email, 120).toLowerCase(),
    phone: normalize(sourcePayload.phone, 25),
    company: normalize(sourcePayload.company, 120),
    businessType: normalize(sourcePayload.businessType, 80),
    meetingPurpose: normalize(sourcePayload.meetingPurpose, 120),
    preferredDate: normalize(sourcePayload.preferredDate, 20),
    preferredTime: normalize(sourcePayload.preferredTime, 20),
    notes: normalize(sourcePayload.notes, 1500)
  };

  const requiredChecks = [
    required(data.name, "Name"),
    required(data.email, "Email"),
    required(data.phone, "Phone"),
    required(data.company, "Company"),
    required(data.businessType, "Business type"),
    required(data.meetingPurpose, "Meeting purpose"),
    required(data.preferredDate, "Preferred date"),
    required(data.preferredTime, "Preferred time")
  ];

  const failedRequired = requiredChecks.find(Boolean);
  if (failedRequired) return failedRequired;

  if (!isValidEmail(data.email)) return { success: false, error: "Please provide a valid email address." };
  if (!isValidPhone(data.phone)) return { success: false, error: "Please provide a valid phone number." };

  const date = new Date(data.preferredDate);
  if (Number.isNaN(date.getTime())) return { success: false, error: "Invalid preferred date." };

  return { success: true, data };
}

export function validateAdminLoginPayload(payload: unknown): ValidationResult<AdminLoginPayload> {
  const sourcePayload = (payload ?? {}) as Record<string, unknown>;
  const email = normalize(sourcePayload.email, 120).toLowerCase();
  const password = normalize(sourcePayload.password, 180);

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  if (!isValidEmail(email)) {
    return { success: false, error: "Please provide a valid email address." };
  }

  return { success: true, data: { email, password } };
}

export function validateTextStatus<T extends string>(status: unknown, allowed: readonly T[]): ValidationResult<T> {
  const normalized = normalize(status, 40) as T;
  if (!allowed.includes(normalized)) {
    return { success: false, error: `Invalid status. Allowed values: ${allowed.join(", ")}` };
  }
  return { success: true, data: normalized };
}
