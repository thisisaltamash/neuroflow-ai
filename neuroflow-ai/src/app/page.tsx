import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ChatbotDemo } from "@/components/ChatbotDemo";

const services = ["AI Chatbot (WhatsApp + Website)", "Appointment Automation", "Patient Follow-ups", "Review Automation", "Voice AI Receptionist"];
const steps = ["Analyze Clinic", "Build Automation", "Scale Growth"];
const pricing = [
  { name: "Starter", price: "$499/mo", items: "Single workflow + chatbot" },
  { name: "Growth", price: "$999/mo", items: "Multi-workflow + reminders" },
  { name: "Premium", price: "$1,999/mo", items: "Voice AI + full automation suite" }
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-20 px-4 py-14">
      <AnimatedSection className="space-y-6 text-center">
        <h1 className="text-4xl font-bold md:text-6xl">Automate Your Clinic Operations with AI</h1>
        <p className="mx-auto max-w-2xl text-white/70">Reduce workload, save time, and increase patient flow.</p>
        <div className="flex justify-center gap-3">
          <Link href="/contact" className="rounded-full bg-blue-600 px-6 py-3 font-medium shadow-glow">Book Free Consultation</Link>
          <a href="#demo" className="rounded-full border border-white/20 px-6 py-3">View Demo</a>
        </div>
      </AnimatedSection>

      <AnimatedSection className="grid gap-4 md:grid-cols-3">
        {services.map((service) => <div key={service} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">{service}</div>)}
      </AnimatedSection>

      <AnimatedSection className="grid gap-4 md:grid-cols-3">
        {steps.map((step, i) => <div key={step} className="rounded-2xl border border-purple-400/20 bg-purple-500/5 p-5"><p className="text-sm text-purple-300">Step {i + 1}</p><p className="text-xl">{step}</p></div>)}
      </AnimatedSection>

      <AnimatedSection id="demo" className="grid gap-6 md:grid-cols-2">
        <ChatbotDemo />
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="mb-3 text-xl">Automation Dashboard Preview</h3>
          <ul className="space-y-2 text-white/80">
            <li>Live lead tracker</li>
            <li>Follow-up funnel analytics</li>
            <li>Appointment conversion status</li>
          </ul>
        </div>
      </AnimatedSection>

      <AnimatedSection className="grid gap-4 md:grid-cols-3">
        {["Dr. Ayesha - Doubled appointment bookings", "Dr. Khan - Saved 15 hours/week", "Care Clinic - 43% faster lead response"].map((t) => (
          <blockquote key={t} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/80">{t}</blockquote>
        ))}
      </AnimatedSection>

      <AnimatedSection className="grid gap-4 md:grid-cols-3">
        {pricing.map((p) => <div key={p.name} className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5"><h4 className="text-xl">{p.name}</h4><p className="my-2 text-2xl font-semibold">{p.price}</p><p className="text-white/70">{p.items}</p></div>)}
      </AnimatedSection>

      <AnimatedSection className="rounded-3xl border border-white/15 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-10 text-center">
        <h2 className="text-3xl font-semibold">Ready to modernize your clinic?</h2>
        <Link href="/contact" className="mt-5 inline-block rounded-full bg-blue-600 px-6 py-3">Start With NeuroFlow AI</Link>
      </AnimatedSection>
    </div>
  );
}
