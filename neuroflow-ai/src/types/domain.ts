export type InquiryStatus = "new" | "in_progress" | "won" | "lost";
export type BookingStatus = "new" | "scheduled" | "completed" | "cancelled";

export interface ServiceContent {
  slug: string;
  title: string;
  description: string;
  benefits: string[];
  workflow: string[];
  startingPrice: string;
  ctaLabel: string;
  audience: string;
}

export interface TestimonialContent {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  impact: string;
}

export interface PricingPlan {
  name: "STARTER" | "GROWTH" | "ENTERPRISE";
  monthlyPrice: string;
  yearlyPrice: string;
  summary: string;
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudyPoint {
  month: string;
  value: number;
}

export interface CaseStudyContent {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: CaseStudyMetric[];
  chart: CaseStudyPoint[];
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  speciality: string;
}

export interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  serviceInterested: string;
  message: string;
  source?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  phone: string;
  serviceInterested: string;
  message: string;
}

export interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  meetingPurpose: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

export interface AdminLoginPayload {
  email: string;
  password: string;
}

export interface DashboardKpi {
  label: string;
  value: number;
  delta: number;
}
