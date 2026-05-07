import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CaseStudyBars } from "@/components/ui/CaseStudyBars";
import { CASE_STUDIES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Review realistic AI automation case studies with ROI metrics, conversion growth, and support analytics."
};

export default function CaseStudiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center">
        <p className="text-xs uppercase tracking-[0.32em] text-red-200/80">Case Studies</p>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">Realistic Automation Outcomes Across Industries</h1>
        <p className="mx-auto mt-4 max-w-3xl text-white/70">
          Example outcomes showing how AI automation can improve response speed, lead conversion, support efficiency, and ROI.
        </p>
      </AnimatedSection>

      <div className="mt-10 space-y-6">
        {CASE_STUDIES.map((study, index) => (
          <AnimatedSection key={study.id} className="rounded-3xl border border-white/10 bg-white/5 p-6" delay={0.04 * index}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-red-200/80">{study.industry}</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{study.title}</h2>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/55">Challenge</p>
                <p className="mt-2 text-sm text-white/75">{study.challenge}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/55">Solution</p>
                <p className="mt-2 text-sm text-white/75">{study.solution}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/55">Outcome</p>
                <p className="mt-2 text-sm text-white/75">{study.outcome}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {study.metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-red-300/25 bg-red-500/10 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-red-100/80">{metric.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">Performance Trend</p>
              <CaseStudyBars points={study.chart} />
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
