"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PricingPlan } from "@/types/domain";

type PricingCardsProps = {
  plans: PricingPlan[];
};

export function PricingCards({ plans }: PricingCardsProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const processed = useMemo(
    () =>
      plans.map((plan) => ({
        ...plan,
        price: billing === "monthly" ? `${plan.monthlyPrice}/month` : plan.yearlyPrice
      })),
    [billing, plans]
  );

  return (
    <div className="space-y-8">
      <div className="mx-auto inline-flex rounded-full border border-white/15 bg-white/5 p-1">
        {(["monthly", "yearly"] as const).map((option) => (
          <button
            key={option}
            onClick={() => setBilling(option)}
            className={`rounded-full px-4 py-2 text-sm transition ${billing === option ? "bg-red-500/25 text-red-100" : "text-white/70"}`}
          >
            {option === "monthly" ? "Monthly" : "Yearly"}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {processed.map((plan) => (
          <article
            key={plan.name}
            className={`rounded-3xl border p-6 ${
              plan.highlighted
                ? "border-red-300/45 bg-gradient-to-b from-red-500/20 to-black/40 shadow-[0_0_45px_rgba(255,40,40,0.25)]"
                : "border-white/10 bg-white/5"
            }`}
          >
            <p className="text-sm uppercase tracking-[0.22em] text-white/60">{plan.name}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{plan.price}</p>
            <p className="mt-3 text-sm text-white/70">{plan.summary}</p>
            <ul className="mt-5 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="text-sm text-white/80">
                  • {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-medium ${
                plan.highlighted ? "bg-red-500 text-white" : "border border-white/20 text-white"
              }`}
            >
              {plan.ctaLabel}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
