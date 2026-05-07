import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { PricingCards } from "@/components/ui/PricingCards";
import { PRICING_COMPARISON_HEADERS, PRICING_COMPARISON_ROWS, PRICING_PLANS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing Plans",
  description: "Compare STARTER, GROWTH, and ENTERPRISE plans for AI automation services with transparent pricing."
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center">
        <p className="text-xs uppercase tracking-[0.32em] text-red-200/80">Pricing</p>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">Flexible Plans for Automation Growth</h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Choose a plan based on your workflow complexity and scale with specialized automation systems.
        </p>
      </AnimatedSection>

      <AnimatedSection className="mt-12" delay={0.05}>
        <PricingCards plans={PRICING_PLANS} />
      </AnimatedSection>

      <AnimatedSection className="mt-14" delay={0.08}>
        <h2 className="mb-5 text-2xl font-semibold text-white">Plan Comparison</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="min-w-full text-left text-sm text-white/80">
            <thead>
              <tr className="border-b border-white/10">
                {PRICING_COMPARISON_HEADERS.map((header) => (
                  <th key={header} className="px-4 py-3 font-medium text-white">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRICING_COMPARISON_ROWS.map((row) => (
                <tr key={row[0]} className="border-b border-white/10 last:border-b-0">
                  {row.map((cell) => (
                    <td key={cell} className="px-4 py-3 text-white/75">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-14 rounded-3xl border border-red-300/30 bg-gradient-to-r from-red-500/20 to-black p-8" delay={0.12}>
        <h2 className="text-3xl font-semibold text-white">Need a custom enterprise automation architecture?</h2>
        <p className="mt-3 max-w-3xl text-white/75">
          We design bespoke AI systems for multi-location businesses, larger clinics, and high-volume sales teams.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white">
            Send Enterprise Inquiry
          </Link>
          <Link href="/book-demo" className="rounded-full border border-white/25 px-6 py-3 text-sm text-white">
            Book Consultation
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
