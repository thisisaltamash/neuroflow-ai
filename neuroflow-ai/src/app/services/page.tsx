const items = [
  { title: "AI Chatbot (WhatsApp + Website)", desc: "Respond instantly to patient queries and collect leads 24/7." },
  { title: "Appointment Automation", desc: "Automate scheduling, reminders, and no-show prevention workflows." },
  { title: "Patient Follow-ups", desc: "Trigger post-visit reminders and treatment adherence messaging." },
  { title: "Review Automation", desc: "Collect Google and social reviews from satisfied patients at scale." },
  { title: "Voice AI Receptionist", desc: "Handle inbound calls and booking requests with natural voice prompts." }
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="mb-8 text-4xl font-bold">Services</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((service) => (
          <article key={service.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-2 text-xl text-blue-300">{service.title}</h2>
            <p className="text-white/75">{service.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
