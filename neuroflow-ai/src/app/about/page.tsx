import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ABOUT_TIMELINE, TEAM_MEMBERS } from "@/lib/content";

export const metadata: Metadata = {
  title: "About NeuroFlow AI",
  description: "Learn NeuroFlow AI’s mission, founder vision, automation philosophy, and team."
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center">
        <p className="text-xs uppercase tracking-[0.32em] text-red-200/80">About NeuroFlow AI</p>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">We Build AI Automation That Performs in Production</h1>
        <p className="mx-auto mt-4 max-w-3xl text-white/70">
          NeuroFlow AI is an automation-first agency focused on conversion velocity, operational efficiency, and measurable revenue impact.
        </p>
      </AnimatedSection>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        <AnimatedSection className="rounded-2xl border border-white/10 bg-white/5 p-6" delay={0.04}>
          <h2 className="text-xl font-semibold text-white">Company Story</h2>
          <p className="mt-3 text-sm text-white/75">
            We began by solving one major issue for service teams: delayed lead response. From there, we developed full AI workflow systems that combine chat, CRM, calls, and analytics into a single performance engine.
          </p>
        </AnimatedSection>

        <AnimatedSection className="rounded-2xl border border-white/10 bg-white/5 p-6" delay={0.08}>
          <h2 className="text-xl font-semibold text-white">Mission</h2>
          <p className="mt-3 text-sm text-white/75">
            Give businesses and clinics a practical, high-leverage automation stack that improves speed, conversion, and customer experience.
          </p>
        </AnimatedSection>

        <AnimatedSection className="rounded-2xl border border-white/10 bg-white/5 p-6" delay={0.12}>
          <h2 className="text-xl font-semibold text-white">Founder Vision</h2>
          <p className="mt-3 text-sm text-white/75">
            Build the most trusted AI automation partner in India for growth-focused teams that care about outcomes, not hype.
          </p>
        </AnimatedSection>
      </div>

      <AnimatedSection className="mt-14" delay={0.16}>
        <h2 className="mb-6 text-2xl font-semibold text-white md:text-3xl">Automation Philosophy Timeline</h2>
        <div className="space-y-4">
          {ABOUT_TIMELINE.map((entry) => (
            <article key={entry.year} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-red-200/80">{entry.year}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{entry.title}</h3>
              <p className="mt-2 text-sm text-white/75">{entry.description}</p>
            </article>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-14" delay={0.2}>
        <h2 className="mb-6 text-2xl font-semibold text-white md:text-3xl">Team</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {TEAM_MEMBERS.map((member) => (
            <article key={member.name} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="mt-1 text-sm text-red-100">{member.role}</p>
              <p className="mt-3 text-sm text-white/70">{member.speciality}</p>
            </article>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
