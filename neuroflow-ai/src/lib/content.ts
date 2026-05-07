import type { CaseStudyContent, PricingPlan, ServiceContent, TeamMember, TestimonialContent, TimelineEntry } from "@/types/domain";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;

export const TRUSTED_LOGOS = ["AsterCare Clinics", "MedAxis Health", "PrimeDental", "NextGen Realty", "Pulse Fitness", "LocalBoost Agency"];

export const HOME_STATS = [
  { label: "Qualified Leads Generated", value: 4200 },
  { label: "Automated Conversations", value: 125000 },
  { label: "Demo Bookings Processed", value: 980 },
  { label: "Average Response Time", value: 12, suffix: " sec" }
];

export const SERVICE_CATALOG: ServiceContent[] = [
  {
    slug: "ai-chatbots",
    title: "AI Chatbots",
    description: "Deploy multilingual AI chatbots across web and social channels to qualify leads, answer FAQs, and trigger workflows in real time.",
    benefits: ["24/7 instant responses", "Lead qualification automation", "Context-aware replies"],
    workflow: ["Discovery and intent mapping", "Bot script and knowledge setup", "CRM + channel integration", "Launch and optimization"],
    startingPrice: "From ₹18,000/month",
    ctaLabel: "Book Chatbot Strategy Call",
    audience: "Clinics, D2C brands, agencies"
  },
  {
    slug: "whatsapp-automation",
    title: "WhatsApp Automation",
    description: "Convert inbound WhatsApp inquiries into qualified leads through smart flows, auto-follow ups, and reminder campaigns.",
    benefits: ["Lower missed inquiries", "Automated reminders", "Higher conversion rates"],
    workflow: ["WhatsApp API setup", "Funnel flow design", "Message templates and rules", "Campaign launch"],
    startingPrice: "From ₹20,000/month",
    ctaLabel: "Launch WhatsApp Funnel",
    audience: "Local businesses, clinics, education"
  },
  {
    slug: "voice-ai-agents",
    title: "Voice AI Agents",
    description: "Use natural voice AI agents to answer calls, capture intent, and schedule callbacks without adding staff overhead.",
    benefits: ["24/7 call handling", "No lead leakage", "Automated call logs"],
    workflow: ["Voice persona design", "Call flow mapping", "Telephony integration", "Live deployment"],
    startingPrice: "From ₹35,000/month",
    ctaLabel: "Set Up Voice Agent",
    audience: "Clinics, real estate, service businesses"
  },
  {
    slug: "crm-automation",
    title: "CRM Automation",
    description: "Connect forms, calls, chats, and campaigns with CRM pipelines to automate tasks, scoring, and follow-up tracking.",
    benefits: ["Centralized lead pipeline", "Automated task assignment", "Pipeline visibility"],
    workflow: ["CRM audit", "Pipeline architecture", "Rules and automations", "Reporting setup"],
    startingPrice: "From ₹25,000/month",
    ctaLabel: "Automate CRM",
    audience: "Sales teams and agencies"
  },
  {
    slug: "lead-generation-systems",
    title: "Lead Generation Systems",
    description: "Build integrated lead engines combining ads, landing pages, and conversational AI for predictable demand generation.",
    benefits: ["Higher lead quality", "Faster lead routing", "Campaign-level tracking"],
    workflow: ["Offer and funnel strategy", "Landing page + forms", "Automation build", "Optimization cycle"],
    startingPrice: "From ₹30,000/month",
    ctaLabel: "Build Lead Engine",
    audience: "Startups, agencies, healthcare"
  },
  {
    slug: "appointment-automation",
    title: "Appointment Automation",
    description: "Automate booking confirmations, reminders, rescheduling, and no-show prevention across WhatsApp, SMS, and email.",
    benefits: ["Fewer no-shows", "Higher booking completion", "Reduced admin effort"],
    workflow: ["Calendar and form sync", "Reminder sequence setup", "Reschedule/cancel logic", "Performance tracking"],
    startingPrice: "From ₹22,000/month",
    ctaLabel: "Automate Appointments",
    audience: "Doctors, clinics, consulting teams"
  },
  {
    slug: "instagram-dm-automation",
    title: "Instagram DM Automation",
    description: "Convert Instagram engagement into inbound consultations with smart DM flows and keyword-based automations.",
    benefits: ["Instant DM replies", "Lead capture from social", "Automated consultation routing"],
    workflow: ["Intent keyword planning", "DM sequence creation", "Lead handover setup", "Campaign monitoring"],
    startingPrice: "From ₹18,000/month",
    ctaLabel: "Scale Instagram Leads",
    audience: "Creators, beauty, wellness, clinics"
  },
  {
    slug: "ai-customer-support",
    title: "AI Customer Support",
    description: "Deploy AI support assistants for ticket deflection, FAQ handling, and escalations to human agents when needed.",
    benefits: ["Lower support costs", "24/7 service availability", "Faster response SLA"],
    workflow: ["Knowledge base ingestion", "Escalation routing", "Support integration", "Quality assurance"],
    startingPrice: "From ₹28,000/month",
    ctaLabel: "Upgrade Support Stack",
    audience: "SaaS, ecommerce, healthcare"
  },
  {
    slug: "email-automation",
    title: "Email Automation",
    description: "Set up lifecycle email automations for onboarding, reactivation, nurture, and conversion.",
    benefits: ["Consistent follow-up", "Better retention", "Improved conversion"],
    workflow: ["Audience segmentation", "Email sequence mapping", "Template build", "Performance analytics"],
    startingPrice: "From ₹16,000/month",
    ctaLabel: "Automate Email Journeys",
    audience: "Startups, clinics, agencies"
  },
  {
    slug: "workflow-integration",
    title: "Workflow Integration",
    description: "Integrate your tools stack across forms, CRM, ad platforms, calendars, and communication channels with no-code/low-code automation.",
    benefits: ["Fewer manual tasks", "Connected systems", "Reliable data flow"],
    workflow: ["Stack audit", "Integration blueprint", "Workflow build", "Monitoring and fallback"],
    startingPrice: "From ₹27,000/month",
    ctaLabel: "Integrate Workflows",
    audience: "Operations teams"
  },
  {
    slug: "business-analytics",
    title: "Business Analytics",
    description: "Get dashboards that track inquiry sources, conversion rates, follow-up speed, and campaign ROI for clearer business decisions.",
    benefits: ["Real-time visibility", "Conversion analytics", "Attribution clarity"],
    workflow: ["Data source mapping", "Dashboard design", "Metric calibration", "Weekly insights review"],
    startingPrice: "From ₹24,000/month",
    ctaLabel: "Track Performance",
    audience: "Founders, sales managers"
  },
  {
    slug: "doctor-clinic-automation",
    title: "Doctor/Clinic Automation",
    description: "Purpose-built automation stack for medical practices including inquiry triage, appointments, reminders, and patient communication flows.",
    benefits: ["Faster patient intake", "Reduced front-desk load", "Higher consultation throughput"],
    workflow: ["Practice intake audit", "Patient flow design", "Multi-channel automation", "Operational reporting"],
    startingPrice: "From ₹32,000/month",
    ctaLabel: "Automate Your Clinic",
    audience: "Doctors, clinics, specialty centers"
  }
];

export const TESTIMONIALS: TestimonialContent[] = [
  {
    name: "Dr. Ayesha Mirza",
    role: "Founder",
    company: "CarePoint Clinic",
    quote: "NeuroFlow AI replaced most of our manual inquiry handling. Our reception team now focuses on high-value patient interactions.",
    rating: 5,
    impact: "2.1x consultation bookings"
  },
  {
    name: "Raghav Mehta",
    role: "Growth Head",
    company: "UrbanPulse Fitness",
    quote: "We plugged their WhatsApp + CRM automation in two weeks and instantly improved response speed and conversion.",
    rating: 5,
    impact: "44% faster lead-to-call time"
  },
  {
    name: "Nida Khan",
    role: "Operations Director",
    company: "PrimeDental Network",
    quote: "Appointment reminders and no-show prevention alone paid for the project in the first month.",
    rating: 5,
    impact: "31% fewer no-shows"
  }
];

export const FAQ_ITEMS = [
  {
    question: "How quickly can NeuroFlow AI go live?",
    answer: "Most automation systems launch in 10 to 21 days depending on integration complexity and channel approvals."
  },
  {
    question: "Do you work only with healthcare businesses?",
    answer: "No. We specialize in healthcare and also build automation for startups, local businesses, agencies, and service companies."
  },
  {
    question: "Can you integrate with our current CRM and tools?",
    answer: "Yes. We integrate with major CRM platforms, calendars, WhatsApp APIs, ad tools, and custom workflows."
  },
  {
    question: "Is there a long-term lock-in contract?",
    answer: "No forced lock-ins. Plans are structured on monthly retainers with transparent scope and deliverables."
  },
  {
    question: "Will we get reports and analytics?",
    answer: "Yes. Every plan includes performance reporting with lead, booking, and funnel metrics tied to business outcomes."
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "STARTER",
    monthlyPrice: "₹15,000",
    yearlyPrice: "₹1,62,000",
    summary: "For businesses validating AI automation with a focused workflow.",
    features: ["1 primary automation workflow", "Lead capture + follow-up setup", "Basic dashboard reporting", "Monthly optimization review"],
    ctaLabel: "Start Starter Plan"
  },
  {
    name: "GROWTH",
    monthlyPrice: "₹35,000",
    yearlyPrice: "₹3,78,000",
    summary: "For teams scaling inquiries, appointments, and multi-channel conversions.",
    features: ["Up to 4 integrated workflows", "WhatsApp + CRM + email automations", "Advanced funnel analytics", "Priority support and weekly optimization"],
    ctaLabel: "Scale with Growth",
    highlighted: true
  },
  {
    name: "ENTERPRISE",
    monthlyPrice: "₹75,000+",
    yearlyPrice: "Custom annual contracts",
    summary: "For larger operations needing custom AI systems, multi-branch workflows, and strategic support.",
    features: ["Custom architecture and integrations", "Voice AI and advanced routing", "Dedicated automation strategist", "SLA-backed execution support"],
    ctaLabel: "Talk to Enterprise Team"
  }
];

export const PRICING_COMPARISON_HEADERS = ["Capability", "Starter", "Growth", "Enterprise"];

export const PRICING_COMPARISON_ROWS = [
  ["Automation Workflows", "1", "Up to 4", "Unlimited (custom)"],
  ["WhatsApp Automation", "Optional", "Included", "Included"],
  ["Voice AI Agent", "No", "Add-on", "Included"],
  ["CRM Integration", "Basic", "Advanced", "Advanced + custom"],
  ["Reporting", "Monthly", "Weekly", "Real-time + strategic"],
  ["Support", "Standard", "Priority", "Dedicated"],
  ["Implementation Speed", "14-21 days", "10-18 days", "Custom timeline"]
];

export const ABOUT_TIMELINE: TimelineEntry[] = [
  {
    year: "2023",
    title: "Agency Foundation",
    description: "NeuroFlow AI started as a specialized automation studio helping local service businesses reduce lead response delays."
  },
  {
    year: "2024",
    title: "Healthcare Expansion",
    description: "Expanded into clinic and doctor automation with appointment and patient communication workflows."
  },
  {
    year: "2025",
    title: "AI Systems Scale",
    description: "Introduced advanced voice AI, CRM orchestration, and analytics-backed growth frameworks."
  },
  {
    year: "2026",
    title: "Enterprise Readiness",
    description: "Now delivering production-grade automation programs for startups, agencies, clinics, and multi-location operations."
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Altamash Ansari", role: "Founder & Automation Architect", speciality: "Growth systems and AI-first operations" },
  { name: "Nisha Verma", role: "Head of Delivery", speciality: "Workflow implementation and QA" },
  { name: "Karan Iqbal", role: "AI Integrations Lead", speciality: "CRM, API, and channel integrations" },
  { name: "Sana Sheikh", role: "Client Success Manager", speciality: "Adoption, reporting, and optimization" }
];

export const CASE_STUDIES: CaseStudyContent[] = [
  {
    id: "clinic-automation",
    title: "Multi-Specialty Clinic Automation",
    industry: "Healthcare",
    challenge: "The clinic missed 38% of after-hours inquiries and struggled with no-shows.",
    solution: "Implemented WhatsApp triage bot, appointment reminders, and CRM pipeline automation.",
    outcome: "Converted more inquiries into consultations with less manual admin workload.",
    metrics: [
      { label: "Lead Response Time", value: "-67%" },
      { label: "Consultation Bookings", value: "+112%" },
      { label: "No-Show Rate", value: "-31%" }
    ],
    chart: [
      { month: "Jan", value: 42 },
      { month: "Feb", value: 56 },
      { month: "Mar", value: 68 },
      { month: "Apr", value: 79 },
      { month: "May", value: 91 },
      { month: "Jun", value: 102 }
    ]
  },
  {
    id: "lead-generation-growth",
    title: "Service Business Lead Generation Engine",
    industry: "Local Business",
    challenge: "The team depended on manual call-backs and had no reliable lead nurturing workflow.",
    solution: "Created funnel landing pages, AI chatbot qualification, and automated call booking flows.",
    outcome: "Built a predictable lead pipeline with better source attribution and sales velocity.",
    metrics: [
      { label: "Qualified Leads", value: "+186%" },
      { label: "Cost per Lead", value: "-29%" },
      { label: "Lead-to-Call Conversion", value: "+53%" }
    ],
    chart: [
      { month: "Jan", value: 25 },
      { month: "Feb", value: 34 },
      { month: "Mar", value: 48 },
      { month: "Apr", value: 63 },
      { month: "May", value: 70 },
      { month: "Jun", value: 86 }
    ]
  },
  {
    id: "ai-chatbot-support",
    title: "AI Chatbot Customer Support Modernization",
    industry: "SaaS",
    challenge: "Support agents were overloaded with repetitive requests and slow first responses.",
    solution: "Deployed a knowledge-trained AI support bot with escalation rules and ticket context sync.",
    outcome: "Improved first-contact resolution while reducing support queue pressure.",
    metrics: [
      { label: "Support Ticket Deflection", value: "41%" },
      { label: "First Response Time", value: "-58%" },
      { label: "CSAT", value: "+18 points" }
    ],
    chart: [
      { month: "Jan", value: 30 },
      { month: "Feb", value: 39 },
      { month: "Mar", value: 46 },
      { month: "Apr", value: 55 },
      { month: "May", value: 63 },
      { month: "Jun", value: 72 }
    ]
  }
];

export const FOOTER_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/book-demo", label: "Book Demo" },
  { href: "/contact", label: "Contact" }
] as const;

export const SERVICE_OPTIONS = SERVICE_CATALOG.map((service) => service.title);

export const BUSINESS_TYPES = ["Clinic", "Doctor", "Startup", "Agency", "Local Business", "Ecommerce", "Other"];

export const MEETING_PURPOSES = ["Strategy Call", "Service Walkthrough", "Automation Audit", "Pricing Discussion", "Enterprise Inquiry"];
