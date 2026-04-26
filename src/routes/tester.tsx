import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { products } from "@/data/nykaa";
import { useTesterBookings } from "@/hooks/useStorage";
import { ChevronLeft, Check, Package, Sparkles } from "lucide-react";

export const Route = createFileRoute("/tester")({
  head: () => ({
    meta: [
      { title: "Book a Tester Kit — Nykaa" },
      { name: "description", content: "Try before you buy — free samples shipped to your door, plus exclusive in-store testers." },
    ],
  }),
  component: TesterPage,
});

function TesterPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const { add } = useTesterBookings();

  const sampleable = products.filter((p) => p.hasTester);
  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 5 ? [...prev, id] : prev));

  const submit = () => {
    if (selected.length < 3) return;
    add(selected);
    setConfirmed(true);
  };

  return (
    <MobileShell showHeader={false} hideAiButton>
      <header className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <Link to="/" className="p-1 -ml-1">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-base font-bold flex-1">Ship Your Tester</h1>
      </header>

      {confirmed ? (
        <div className="px-6 pt-12 text-center">
          <div className="w-20 h-20 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-lg font-extrabold">Tester kit booked!</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Your free samples will arrive in 2-3 days. After trying, get an exclusive 20% OFF on your favorites.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-4">
            <p className="text-[11px] uppercase tracking-wider font-bold text-amber-900">Conversion code</p>
            <p className="text-2xl font-mono font-bold text-amber-900 mt-1">AFTERTESTING20</p>
            <p className="text-[10px] text-amber-800 mt-1">Auto-applies after delivery</p>
          </div>
          <Link
            to="/"
            className="block mt-6 bg-primary text-primary-foreground font-bold py-3 rounded-lg text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="px-4 pt-4">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Package className="w-5 h-5 text-info" />
                <p className="text-sm font-extrabold">Try Before You Buy</p>
              </div>
              <p className="text-[11px] text-muted-foreground leading-snug">
                Pick 3-5 products. We'll ship free samples to your door in 2-3 days. Try them, then get 20% OFF on your favorites.
              </p>
            </div>
          </div>

          <div className="px-4 pt-5">
            <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground mb-2">
              Select 3-5 products ({selected.length}/5)
            </p>
            <div className="grid grid-cols-2 gap-3">
              {sampleable.map((p) => {
                const isSelected = selected.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => toggle(p.id)}
                    className={`text-left bg-card rounded-xl border-2 transition overflow-hidden ${
                      isSelected ? "border-primary" : "border-border"
                    }`}
                  >
                    <div className="aspect-square flex items-center justify-center text-5xl relative" style={{ background: p.gradient }}>
                      {p.emoji}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                      <span className="absolute top-2 left-2 text-[9px] bg-purple-200 text-purple-900 font-bold px-1.5 py-0.5 rounded">
                        SAMPLE
                      </span>
                    </div>
                    <div className="p-2">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">{p.brand}</p>
                      <p className="text-xs font-semibold leading-tight line-clamp-2">{p.name}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="px-4 pt-6 pb-4">
            <div className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="text-[11px] text-muted-foreground leading-snug">
                Earn <span className="font-bold text-primary">+25 Nykaa ONE points</span> when you book and convert your tester kit.
              </div>
            </div>
          </div>

          <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-full max-w-[440px] bg-background border-t border-border p-3 z-30">
            <button
              onClick={submit}
              disabled={selected.length < 3}
              className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {selected.length < 3
                ? `SELECT ${3 - selected.length} MORE TO BOOK`
                : `BOOK FREE TESTER KIT (${selected.length})`}
            </button>
          </div>
        </>
      )}
    </MobileShell>
  );
}
