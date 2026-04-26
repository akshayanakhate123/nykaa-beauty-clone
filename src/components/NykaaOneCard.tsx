import { Link } from "@tanstack/react-router";
import { Crown, ChevronRight, Calendar, Store, Sparkles } from "lucide-react";
import { useLoyalty } from "@/hooks/useStorage";
import { tierInfo, type Tier } from "@/data/nykaa";

const tierOrder: Tier[] = ["bronze", "silver", "gold", "platinum"];

export function NykaaOneCard({ compact = false }: { compact?: boolean }) {
  const { points, tier, streak, monthlyVisited } = useLoyalty();
  const current = tierInfo[tier];
  const nextTierKey = tierOrder[tierOrder.indexOf(tier) + 1];
  const next = nextTierKey ? tierInfo[nextTierKey] : null;
  const progress = next
    ? Math.min(100, ((points - current.pointsRequired) / (next.pointsRequired - current.pointsRequired)) * 100)
    : 100;

  return (
    <Link
      to="/loyalty"
      className="block mx-4 mt-3 rounded-2xl overflow-hidden text-white shadow-lg"
      style={{
        background: "linear-gradient(135deg, oklch(0.25 0.08 280), oklch(0.18 0.05 270))",
      }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: current.color }} />
            <p className="text-[11px] font-bold tracking-wider uppercase opacity-90">Nykaa ONE — Unified Rewards</p>
          </div>
          <ChevronRight className="w-4 h-4 opacity-70" />
        </div>

        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <Crown className="w-5 h-5" style={{ color: current.color }} />
              <p className="text-base font-extrabold" style={{ color: current.color }}>
                {current.name} Tier Member
              </p>
            </div>
            <p className="text-2xl font-extrabold mt-1">
              {points.toLocaleString()} <span className="text-xs font-semibold opacity-80">pts</span>
            </p>
            <p className="text-[10px] opacity-70">In-Store + Online · Visible at checkout</p>
          </div>
        </div>

        {next && (
          <div>
            <div className="flex justify-between text-[10px] mb-1 opacity-90">
              <span>Progressing to {next.name}</span>
              <span className="font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, background: current.color }}
              />
            </div>
            <p className="text-[10px] opacity-70 mt-1">
              {(next.pointsRequired - points).toLocaleString()} points to {next.name}
            </p>
          </div>
        )}

        {!compact && (
          <>
            {/* Promo */}
            <div className="bg-amber-50 text-amber-900 rounded-xl p-3 mt-3">
              <p className="text-xs font-bold">In-Store Bonus x3! 🎁</p>
              <p className="text-[10px] mt-0.5 leading-snug">
                Shop in-store before 27-03-2027 on products you browsed online within 7 days.
              </p>
              <p className="text-[10px] font-bold mt-1 text-amber-700">⏱ 5 days left</p>
            </div>

            {/* Action items */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <ActionTile
                icon={Calendar}
                title="App Streak"
                subtitle={`${streak} day streak`}
                reward="+10 pts"
                cta="Continue"
              />
              <ActionTile
                icon={Store}
                title="Monthly Visit"
                subtitle={monthlyVisited ? "Done this month" : "Not visited"}
                reward="+50 pts"
                cta="Visit Store"
              />
            </div>
          </>
        )}
      </div>
    </Link>
  );
}

function ActionTile({
  icon: Icon,
  title,
  subtitle,
  reward,
  cta,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  reward: string;
  cta: string;
}) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-lg p-2.5">
      <div className="flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5" />
        <p className="text-[11px] font-bold">{title}</p>
      </div>
      <p className="text-[10px] opacity-80 mt-0.5 truncate">{subtitle}</p>
      <p className="text-[9px] font-bold mt-1" style={{ color: "#FFD700" }}>{reward}</p>
      <p className="text-[10px] mt-1.5 underline opacity-90">{cta}</p>
    </div>
  );
}
