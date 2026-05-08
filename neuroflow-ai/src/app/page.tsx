import type { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

export const metadata: Metadata = {
  title: "NeuroFlow Systems | AI Automation Agency",
  description:
    "NeuroFlow Systems designs premium AI automation engines for clinics, gyms, salons, real estate, and local businesses."
};

const trustLogos = ["OpenAI", "Meta", "WhatsApp", "n8n", "Twilio", "Google Calendar"];

const services = [
  { title: "WhatsApp Automation", desc: "Instant replies, smart lead routing, and conversion-focused follow-ups.", icon: "WA" },
  { title: "Instagram DM Automation", desc: "Automate DM qualification and booking without losing brand tone.", icon: "IG" },
  { title: "AI Calling Agents", desc: "Human-like voice agents for lead nurturing, reminders, and reactivation.", icon: "AI" },
  { title: "CRM Automation", desc: "Trigger-based CRM pipelines with zero manual data entry.", icon: "CRM" },
  { title: "Appointment Booking Systems", desc: "Calendar-ready booking flows with reminders and no-show prevention.", icon: "BK" },
  { title: "Lead Qualification Systems", desc: "Score and segment leads in seconds so your team closes faster.", icon: "LQ" }
];

const workflow = ["Lead Comes In", "AI Replies Instantly", "Lead Gets Qualified", "Appointment Gets Booked"];

const dashboards = [
  { label: "New Leads", value: "1,284", delta: "+18.6%" },
  { label: "Booked Calls", value: "346", delta: "+22.1%" },
  { label: "Reply Speed", value: "4.2s", delta: "-63%" },
  { label: "Lost Leads", value: "3.4%", delta: "-41%" }
];

const caseStudies = [
  { title: "Dental Clinic Automation", stats: ["73% faster replies", "31 more bookings/month", "80% fewer missed leads"] },
  { title: "Gym Lead Recovery Engine", stats: ["2.4x lead conversion", "47% faster follow-ups", "58% lower CAC"] },
  { title: "Real Estate Nurture Flow", stats: ["39% more qualified calls", "24/7 instant response", "92% lead response coverage"] }
];

const pricing = [
  { name: "Starter", price: "$499/mo", points: ["1 automation channel", "Basic AI qualification", "Monthly optimization"] },
  { name: "Growth", price: "$1,299/mo", points: ["Multi-channel automation", "Advanced booking workflows", "Priority support"] },
  { name: "Enterprise", price: "Custom", points: ["Custom AI calling agents", "CRM + BI integrations", "Dedicated automation strategist"] }
];

const testimonials = [
  {
    quote:
      "We stopped losing Instagram and WhatsApp leads overnight. NeuroFlow Systems now replies in seconds and our calendar stays full.",
    name: "Dr. Rhea Kapoor",
    business: "Aesthetic Dental Clinic"
  },
  {
    quote:
      "The AI booking flow replaced hours of manual chat. We now convert warm leads while the team focuses on closing memberships.",
    name: "Aman Verma",
    business: "UrbanFit Gym"
  },
  {
    quote: "Our sales team works only on qualified prospects now. Conversion quality improved and follow-up chaos is gone.",
    name: "Nisha Arora",
    business: "Real Estate Advisory"
  }
];

const faqItems = [
  {
    q: "How quickly can we launch our automation system?",
    a: "Most local businesses launch in 7-14 days depending on channels, CRM integrations, and campaign complexity."
  },
  {
    q: "Do you only work with clinics and local brands?",
    a: "We specialize in clinics, dentists, gyms, salons, real estate, and local service businesses where fast response drives revenue."
  },
  {
    q: "Can your AI book appointments directly?",
    a: "Yes. We integrate WhatsApp, Instagram, voice AI, and calendars to qualify leads and book slots automatically."
  },
  {
    q: "Will this replace my team?",
    a: "No. It removes repetitive follow-up and qualification tasks so your team can focus on high-value sales and service."
  }
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden pb-24">
      <div className="cursor-glow pointer-events-none fixed left-0 top-0 z-0 h-[420px] w-[420px] rounded-full bg-red-500/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-[-320px] h-[680px] bg-[radial-gradient(circle,rgba(255,43,43,0.26)_0%,rgba(255,43,43,0)_68%)]" />
      <div className="pointer-events-none absolute -right-24 top-[30rem] h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <AnimatedSection className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-transparent p-7 md:p-12">
          <div className="absolute -top-16 right-0 h-48 w-48 rounded-full bg-red-500/20 blur-3xl" />
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-red-200/80">NeuroFlow Systems</p>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
                AI Agents That Reply To Leads In Seconds.
              </h1>
              <p className="mt-6 max-w-2xl text-base text-white/70 md:text-lg">
                We build AI automation systems for businesses using WhatsApp, Instagram, Voice AI, and smart workflows
                that drive faster replies, more bookings, and higher conversions.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/book-demo"
                  className="rounded-full bg-gradient-to-r from-[#ff2b2b] to-[#d81717] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(255,43,43,0.45)] transition hover:scale-[1.02]"
                >
                  Book Free Consultation
                </Link>
                <Link
                  href="/case-studies"
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm text-white/90 transition hover:border-red-300/50 hover:bg-white/10"
                >
                  Watch Demo
                </Link>
              </div>
            </div>

            <div className="relative grid gap-3">
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 6.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="rounded-2xl border border-white/15 bg-black/45 p-4 backdrop-blur-xl"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-white/55">Live AI Conversation</p>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="max-w-[85%] rounded-xl bg-white/10 p-2 text-white/85">Hi, I need teeth scaling this week.</div>
                  <div className="ml-auto max-w-[80%] rounded-xl bg-red-500/20 p-2 text-red-100">
                    Perfect, Dr. Mehta has slots Wed 4:30 PM or Thu 11:00 AM.
                  </div>
                  <div className="max-w-[88%] rounded-xl bg-white/10 p-2 text-white/85">Thu 11 AM works.</div>
                  <div className="ml-auto max-w-[70%] rounded-xl bg-red-500/20 p-2 text-red-100">Booked. Confirmation sent.</div>
                </div>
              </motion.div>
              <div className="grid grid-cols-2 gap-3">
                {dashboards.slice(0, 2).map((item) => (
                  <motion.div
                    key={item.label}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg"
                  >
                    <p className="text-xs text-white/55">{item.label}</p>
                    <p className="mt-1 text-xl font-semibold text-white">{item.value}</p>
                    <p className="text-xs text-red-200">{item.delta}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-14" delay={0.04}>
          <p className="text-center text-xs uppercase tracking-[0.26em] text-white/45">Trusted Tech Stack</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {trustLogos.map((logo) => (
              <div key={logo} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm text-white/75">
                {logo}
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-20" delay={0.06}>
          <h2 className="text-3xl text-white md:text-4xl">Automation Services Designed for Revenue</h2>
          <p className="mt-3 max-w-3xl text-white/65">
            Purpose-built systems for clinics, dentists, gyms, salons, real estate, and local businesses that cannot
            afford delayed replies.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 transition duration-300 hover:border-red-300/45 hover:shadow-[0_0_40px_rgba(255,43,43,0.25)]"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-300/40 bg-red-500/15 text-xs font-semibold text-red-100">
                  {service.icon}
                </div>
                <h3 className="mt-4 text-xl text-white">{service.title}</h3>
                <p className="mt-2 text-sm text-white/70">{service.desc}</p>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-20" delay={0.08}>
          <h2 className="text-center text-3xl text-white md:text-4xl">How It Works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {workflow.map((step, index) => (
              <div key={step} className="relative rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-red-200/80">Step {index + 1}</p>
                <p className="mt-3 text-sm text-white/90">{step}</p>
                {index < workflow.length - 1 ? (
                  <div className="pointer-events-none absolute -right-2 top-1/2 hidden h-px w-4 bg-gradient-to-r from-red-400/70 to-transparent md:block" />
                ) : null}
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-20 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]" delay={0.1}>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-red-200/80">Interactive Demo</p>
            <h3 className="mt-4 text-2xl text-white">WhatsApp Booking Simulation</h3>
            <div className="mt-6 space-y-3 text-sm">
              <p className="max-w-[86%] rounded-xl bg-white/10 p-3 text-white/85">Hi, do you have trial sessions this week?</p>
              <p className="ml-auto max-w-[82%] rounded-xl bg-red-500/20 p-3 text-red-100">
                Yes. Morning and evening batches available. Want me to reserve a slot?
              </p>
              <p className="max-w-[72%] rounded-xl bg-white/10 p-3 text-white/85">Tomorrow evening please.</p>
              <p className="ml-auto max-w-[88%] rounded-xl bg-red-500/20 p-3 text-red-100">
                Done. You are booked for 7:00 PM. Confirmation + reminder sent automatically.
              </p>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-7">
            <p className="text-xs uppercase tracking-[0.25em] text-white/55">Automation Snapshot</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {dashboards.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-white/10 bg-black/35 p-4">
                  <p className="text-xs text-white/55">{metric.label}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{metric.value}</p>
                  <p className="text-xs text-red-200">{metric.delta}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-20" delay={0.12}>
          <h2 className="text-3xl text-white md:text-4xl">Dashboard Showcase</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/50">Lead Analytics</p>
              <div className="mt-4 h-36 rounded-xl bg-gradient-to-r from-red-500/30 via-red-400/10 to-white/5" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/50">CRM Pipeline</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="h-28 rounded-lg bg-white/10" />
                <div className="h-28 rounded-lg bg-red-500/15" />
                <div className="h-28 rounded-lg bg-white/10" />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/50">AI Conversation Logs</p>
              <div className="mt-4 space-y-2">
                <div className="h-4 rounded bg-white/10" />
                <div className="h-4 rounded bg-white/10" />
                <div className="h-4 w-4/5 rounded bg-red-400/20" />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-white/50">Appointments Timeline</p>
              <div className="mt-4 h-36 rounded-xl bg-[linear-gradient(120deg,rgba(255,43,43,0.3),rgba(255,43,43,0.05),rgba(255,255,255,0.08))]" />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-20" delay={0.14}>
          <h2 className="text-3xl text-white md:text-4xl">Case Studies</h2>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <article key={study.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl text-white">{study.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  {study.stats.map((stat) => (
                    <li key={stat} className="rounded-lg border border-red-300/20 bg-red-500/10 p-2">
                      {stat}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-20" delay={0.16}>
          <h2 className="text-center text-3xl text-white md:text-4xl">Pricing</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {pricing.map((plan) => (
              <article
                key={plan.name}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-6 transition hover:border-red-300/45 hover:shadow-[0_0_40px_rgba(255,43,43,0.2)]"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-red-200/80">{plan.name}</p>
                <p className="mt-3 text-3xl text-white">{plan.price}</p>
                <ul className="mt-5 space-y-2 text-sm text-white/75">
                  {plan.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-20" delay={0.18}>
          <h2 className="text-3xl text-white md:text-4xl">What Clients Say</h2>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="mb-4 h-12 w-12 rounded-full border border-white/20 bg-gradient-to-br from-red-400/25 to-white/10" />
                <p className="text-sm text-white/80">&ldquo;{item.quote}&rdquo;</p>
                <p className="mt-4 text-base text-white">{item.name}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50">{item.business}</p>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-8 text-center" delay={0.2}>
          <p className="text-xs uppercase tracking-[0.26em] text-red-200/80">Founder Note</p>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/85">
            Built by a CS student obsessed with AI systems, automation, and business efficiency.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-20" delay={0.22}>
          <h2 className="mb-5 text-3xl text-white md:text-4xl">FAQ</h2>
          <FaqAccordion
            items={faqItems.map((item) => ({
              question: item.q,
              answer: item.a
            }))}
          />
        </AnimatedSection>

        <AnimatedSection
          className="mt-20 rounded-3xl border border-red-300/35 bg-[linear-gradient(130deg,rgba(255,43,43,0.2),rgba(8,8,8,0.65),rgba(255,43,43,0.1))] p-10 text-center"
          delay={0.24}
        >
          <h2 className="text-3xl text-white md:text-5xl">Ready To Automate Your Business?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            Install high-converting AI systems that qualify leads instantly and fill your calendar with better bookings.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/book-demo"
              className="rounded-full bg-[#ff2b2b] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_34px_rgba(255,43,43,0.45)] transition hover:scale-[1.02]"
            >
              Book A Call
            </Link>
            <Link href="/contact" className="rounded-full border border-white/25 px-6 py-3 text-sm text-white transition hover:border-white/45">
              Get Free Demo
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
