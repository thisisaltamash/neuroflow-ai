import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SERVICE_CATALOG } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI Automation Services",
  description: "Explore NeuroFlow AI services including chatbots, WhatsApp automation, voice AI, CRM automation, and business analytics."
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center">
        <p className="text-xs uppercase tracking-[0.32em] text-red-200/80">Services</p>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">AI Automation Systems Built for Revenue and Operations</h1>
        <p className="mx-auto mt-4 max-w-3xl text-white/70">
          From chatbots and WhatsApp workflows to voice AI and CRM orchestration, each service includes implementation, optimization, and reporting.
        </p>
      </AnimatedSection>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {SERVICE_CATALOG.map((service, index) => (
          <AnimatedSection key={service.slug} delay={0.03 * (index % 4)} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2 className="text-2xl font-semibold text-white">{service.title}</h2>
              <span className="rounded-full border border-red-300/35 bg-red-500/15 px-3 py-1 text-xs uppercase tracking-[0.16em] text-red-100">
                {service.startingPrice}
              </span>
            </div>
            <p className="mt-3 text-sm text-white/75">{service.description}</p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/55">Benefits</p>
                <ul className="mt-2 space-y-2">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="text-sm text-white/80">
                      • {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/55">Workflow</p>
                <ol className="mt-2 space-y-2">
                  {service.workflow.map((step, stepIndex) => (
                    <li key={step} className="text-sm text-white/80">
                      {stepIndex + 1}. {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <p className="mt-5 text-xs uppercase tracking-[0.18em] text-white/50">Best for: {service.audience}</p>
            <Link href="/contact" className="mt-5 inline-flex rounded-full border border-white/25 px-5 py-2.5 text-sm text-white hover:border-red-300/40">
              {service.ctaLabel}
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
