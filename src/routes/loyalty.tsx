import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { NykaaOneCard } from "@/components/NykaaOneCard";
import { useLoyalty } from "@/hooks/useStorage";
import { tierInfo, type Tier } from "@/data/nykaa";
import { ChevronLeft, Crown, Check, Lock } from "lucide-react";

const tierOrder: Tier[] = ["bronze", "silver", "gold", "platinum"];

export const Route = createFileRoute("/loyalty")({
  head: () => ({
    meta: [
      { title: "Nykaa ONE — Unified Loyalty | Nykaa" },
      { name: "description", content: "Earn points across online and in-store. Bronze, Silver, Gold, Platinum tier benefits." },
    ],
  }),
  component: LoyaltyPage,
});

function LoyaltyPage() {
  const { tier, points } = useLoyalty();

  return (
    <MobileShell showHeader={false} hideAiButton>
      <header className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <Link to="/account" className="p-1 -ml-1">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-base font-bold flex-1">Nykaa ONE</h1>
      </header>

      <NykaaOneCard />

      <div className="px-4 pt-6 pb-6">
        <h2 className="text-sm font-bold mb-3">Loyalty Tiers & Benefits</h2>
        <div className="space-y-3">
          {tierOrder.map((t) => {
            const info = tierInfo[t];
            const isCurrent = t === tier;
            const isUnlocked = tierOrder.indexOf(t) <= tierOrder.indexOf(tier);
            return (
              <div
                key={t}
                className={`rounded-2xl border-2 p-4 transition ${
                  isCurrent
                    ? "border-primary bg-primary/5"
                    : isUnlocked
                    ? "border-border bg-card"
                    : "border-dashed border-border bg-muted opacity-75"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5" style={{ color: info.color }} />
                    <p className="font-extrabold">{info.name}</p>
                    {isCurrent && (
                      <span className="text-[9px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full font-bold">
                        CURRENT
                      </span>
                    )}
                    {!isUnlocked && <Lock className="w-3 h-3 text-muted-foreground" />}
                  </div>
                  <p className="text-[11px] font-bold text-muted-foreground">
                    {info.pointsRequired.toLocaleString()} pts
                  </p>
                </div>
                <p className="text-[11px] text-muted-foreground mb-2">
                  {info.multiplier}x points · {info.earlyAccessHours}h early access
                </p>
                <ul className="space-y-1">
                  {info.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-1.5 text-xs">
                      <Check className="w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-card border border-border rounded-2xl p-4">
          <h3 className="text-sm font-bold mb-2">How to earn points</h3>
          <ul className="space-y-2 text-xs">
            <EarnRow label="Every ₹100 spent" pts={`${tierInfo[tier].multiplier}x pts`} />
            <EarnRow label="Daily app check-in" pts="+10 pts" />
            <EarnRow label="Monthly store visit" pts="+50 pts" />
            <EarnRow label="Book & convert tester kit" pts="+25 pts" />
            <EarnRow label="Write a verified review" pts="+15 pts" />
          </ul>
        </div>

        <p className="text-center text-[11px] text-muted-foreground mt-4">
          You have <span className="font-bold text-foreground">{points.toLocaleString()}</span> Nykaa ONE Points · ₹{Math.round(points * 0.025)} redeemable
        </p>
      </div>
    </MobileShell>
  );
}

function EarnRow({ label, pts }: { label: string; pts: string }) {
  return (
    <li className="flex justify-between border-b border-border pb-1.5 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-bold text-primary">{pts}</span>
    </li>
  );
}
