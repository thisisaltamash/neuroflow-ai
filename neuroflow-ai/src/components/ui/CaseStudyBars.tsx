import type { CaseStudyPoint } from "@/types/domain";

type CaseStudyBarsProps = {
  points: CaseStudyPoint[];
};

export function CaseStudyBars({ points }: CaseStudyBarsProps) {
  const max = Math.max(...points.map((point) => point.value), 1);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="flex items-end gap-2">
        {points.map((point) => {
          const height = Math.max(12, (point.value / max) * 130);
          return (
            <div key={point.month} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-md bg-gradient-to-t from-red-600/80 to-red-300/70" style={{ height }} />
              <span className="text-[11px] text-white/60">{point.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
