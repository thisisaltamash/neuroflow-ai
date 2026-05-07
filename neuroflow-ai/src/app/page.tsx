import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Counter } from "@/components/ui/Counter";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { TestimonialSlider } from "@/components/ui/TestimonialSlider";
import { FAQ_ITEMS, HOME_STATS, SERVICE_CATALOG, TESTIMONIALS, TRUSTED_LOGOS } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI Automation Agency for Businesses and Clinics",
  description:
    "NeuroFlow AI builds premium automation systems for lead generation, appointment workflows, customer support, and growth analytics."
};

const workflowSteps = [
  { title: "Acquire", desc: "Capture every inquiry from website, social, WhatsApp, and ads in one lead engine." },
  { title: "Automate", desc: "Use AI agents and workflow logic to qualify, route, and follow up instantly." },
  { title: "Scale", desc: "Track ROI dashboards and optimize conversion pipelines every week." }
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-52 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,40,40,0.28)_0%,rgba(255,40,40,0)_68%)]" />
      <div className="pointer-events-none absolute right-[-200px] top-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,80,80,0.18)_0%,rgba(255,80,80,0)_75%)]" />

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-8">
        <AnimatedSection className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent px-6 py-14 text-center md:px-12">
          <p className="text-xs uppercase tracking-[0.34em] text-red-200/80">AI Automation Agency</p>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            Build a High-Performance AI Growth Engine for Your Business
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/70 md:text-lg">
            NeuroFlow AI helps businesses, clinics, and agencies automate lead capture, appointment flows, support, and follow-ups with production-grade AI systems.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/book-demo"
              className="rounded-full bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(255,45,45,0.45)]"
            >
              Book Free Demo
            </Link>
            <Link href="/services" className="rounded-full border border-white/25 px-6 py-3 text-sm text-white/90 hover:border-white/45">
              Explore Services
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-12" delay={0.05}>
          <p className="text-center text-xs uppercase tracking-[0.25em] text-white/45">Trusted by growth-focused teams</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {TRUSTED_LOGOS.map((logo) => (
              <div key={logo} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-xs text-white/70">
                {logo}
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16" delay={0.08}>
          <h2 className="text-center text-2xl font-semibold text-white md:text-3xl">AI Workflow Visualization</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {workflowSteps.map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-red-300/20 bg-red-500/5 p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-red-200/75">Step {index + 1}</p>
                <h3 className="mt-2 text-xl font-medium text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-white/70">{step.desc}</p>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16" delay={0.12}>
          <div className="flex items-end justify-between gap-3">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Services Preview</h2>
            <Link href="/services" className="text-sm text-red-200 hover:text-red-100">
              View all services
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {SERVICE_CATALOG.slice(0, 6).map((service) => (
              <article key={service.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-2 text-sm text-white/70">{service.description}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-red-200/80">{service.startingPrice}</p>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4" delay={0.16}>
          {HOME_STATS.map((stat) => (
            <Counter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </AnimatedSection>

        <AnimatedSection className="mt-16" delay={0.2}>
          <h2 className="mb-5 text-2xl font-semibold text-white md:text-3xl">Client Outcomes</h2>
          <TestimonialSlider testimonials={TESTIMONIALS} />
        </AnimatedSection>

        <AnimatedSection className="mt-16" delay={0.22}>
          <h2 className="mb-5 text-2xl font-semibold text-white md:text-3xl">Frequently Asked Questions</h2>
          <FaqAccordion items={FAQ_ITEMS} />
        </AnimatedSection>

        <AnimatedSection className="mt-16 rounded-3xl border border-red-300/25 bg-gradient-to-r from-red-500/20 to-black p-8 text-center" delay={0.24}>
          <h2 className="text-3xl font-semibold text-white">Let NeuroFlow AI automate your revenue workflows</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/75">
            Start with a focused automation audit and get a custom roadmap for lead generation, appointment conversion, and support.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rounded-full border border-white/25 px-6 py-3 text-sm text-white">
              Contact Team
            </Link>
            <Link href="/book-demo" className="rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white">
              Schedule Demo
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
