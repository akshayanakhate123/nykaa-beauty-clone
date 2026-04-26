import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { stores, categories, products } from "@/data/nykaa";
import { useStoreMode, useWishlist } from "@/hooks/useStorage";
import { ChevronLeft, MapPin, Navigation, X, Clock, Tag } from "lucide-react";

export const Route = createFileRoute("/store-map")({
  head: () => ({
    meta: [
      { title: "Store Mode & In-Store Map — Nykaa" },
      { name: "description", content: "Activate Store Mode for in-store navigation, real-time inventory and exclusive offers." },
    ],
  }),
  component: StoreMapPage,
});

function StoreMapPage() {
  const { active, storeId, activate, deactivate } = useStoreMode();
  const { items: wishlistIds } = useWishlist();
  const activeStore = stores.find((s) => s.id === storeId);
  const wishlistInStore = products
    .filter((p) => wishlistIds.includes(p.id) && (p.inStoreStock ?? 0) > 0)
    .slice(0, 4);

  return (
    <MobileShell showHeader={false} hideAiButton>
      <header className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <Link to="/" className="p-1 -ml-1">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-base font-bold flex-1">Store Mode</h1>
        {active && (
          <button
            onClick={deactivate}
            className="text-[11px] font-bold text-destructive flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> Exit
          </button>
        )}
      </header>

      {!active ? (
        <div className="px-4 pt-4">
          <div className="bg-gradient-to-br from-primary/10 to-amber-50 rounded-2xl p-4 mb-4">
            <p className="text-xs uppercase tracking-wider font-bold text-primary">📍 Enable In-Store Mode</p>
            <p className="text-sm font-bold mt-1">Find a store near you</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Real-time inventory · Aisle navigation · In-store exclusive offers · BOPIS pickup
            </p>
          </div>

          <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground mb-2">Nearby stores</p>
          <div className="space-y-2">
            {stores.map((s) => (
              <button
                key={s.id}
                onClick={() => activate(s.id)}
                className="w-full text-left bg-card border border-border rounded-xl p-3 flex items-start gap-3 hover:border-primary transition"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold truncate">{s.name}</p>
                    <span className="text-[10px] text-success font-bold flex-shrink-0">{s.distanceKm} km</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate">{s.address}</p>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{s.hours}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {s.features.map((f) => (
                      <span key={f} className="text-[9px] bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full font-semibold">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Active store header */}
          {activeStore && (
            <div className="bg-success text-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider font-bold opacity-90">In-Store Mode Active</p>
              <p className="text-base font-extrabold">{activeStore.name}</p>
              <p className="text-[11px] opacity-90">{activeStore.address}</p>
            </div>
          )}

          {/* Store map */}
          <div className="px-4 pt-4">
            <p className="text-xs font-bold mb-2">Store Map · You are here</p>
            <StoreMap />
          </div>

          {/* Guided path */}
          <div className="px-4 pt-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold">Guided Shopping Path</p>
              <span className="text-[10px] text-muted-foreground">~12 min</span>
            </div>
            <div className="bg-card border border-border rounded-xl divide-y divide-border">
              <PathStep n={1} title="Aisle 3 · Charlotte Tilbury Pillow Talk" />
              <PathStep n={2} title="Aisle 7 · Kay Beauty Eyeliner" />
              <PathStep n={3} title="Tester Bar 2 · Try shades" />
              <PathStep n={4} title="Checkout" />
            </div>
          </div>

          {/* Wishlist in store */}
          <div className="px-4 pt-6 pb-4">
            <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-2">
              Step 1: Found on your wishlist
            </p>
            {wishlistInStore.length === 0 ? (
              <div className="bg-muted rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground">No wishlist items at this store yet.</p>
                <Link to="/" className="text-xs text-primary font-bold mt-1 inline-block">Browse products →</Link>
              </div>
            ) : (
              <div className="space-y-2">
                {wishlistInStore.map((p) => (
                  <div key={p.id} className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl flex-shrink-0" style={{ background: p.gradient }}>
                      {p.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">{p.brand}</p>
                      <p className="text-xs font-bold leading-tight line-clamp-1">{p.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-bold">
                          Aisle {p.aisle}
                        </span>
                        <span className="text-[10px] text-success font-semibold">{p.inStoreStock} in stock</span>
                      </div>
                    </div>
                    <button className="bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex-shrink-0">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* In-store exclusive offers */}
          <div className="px-4 pb-4">
            <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-2">
              In-store exclusive offers
            </p>
            <div className="space-y-2">
              <OfferCard code="INSTORE20" title="EXTRA 20% OFF" desc="When you check in at this store" />
              <OfferCard code="TESTER15" title="15% OFF after testing" desc="Try at Tester Bar 3, get the discount" />
            </div>
          </div>
        </div>
      )}
    </MobileShell>
  );
}

function PathStep({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3 p-3">
      <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
        {n}
      </div>
      <p className="text-xs font-semibold flex-1">{title}</p>
      <Navigation className="w-4 h-4 text-primary" />
    </div>
  );
}

function OfferCard({ code, title, desc }: { code: string; title: string; desc: string }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-3">
      <Tag className="w-5 h-5 text-amber-700 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-xs font-bold text-amber-900">{title}</p>
        <p className="text-[10px] text-amber-800">{desc}</p>
      </div>
      <span className="text-[10px] font-mono font-bold bg-amber-900 text-white px-2 py-1 rounded">
        {code}
      </span>
    </div>
  );
}

function StoreMap() {
  const aisleColors: Record<string, string> = {
    makeup: "bg-rose-200 text-rose-900",
    skin: "bg-sky-200 text-sky-900",
    hair: "bg-orange-200 text-orange-900",
    body: "bg-emerald-200 text-emerald-900",
    luxe: "bg-amber-200 text-amber-900",
    fragrance: "bg-fuchsia-200 text-fuchsia-900",
    wellness: "bg-lime-200 text-lime-900",
    appliances: "bg-indigo-200 text-indigo-900",
    gifting: "bg-red-200 text-red-900",
    "mom-baby": "bg-yellow-200 text-yellow-900",
    men: "bg-slate-200 text-slate-900",
    korean: "bg-purple-200 text-purple-900",
  };
  return (
    <div className="bg-muted rounded-2xl p-3 border border-border">
      <div className="grid grid-cols-3 gap-1.5">
        {categories.map((c) => (
          <div key={c.id} className={`${aisleColors[c.id]} rounded-lg p-2 text-center`}>
            <p className="text-[16px] leading-none">{c.emoji}</p>
            <p className="text-[9px] font-bold mt-1 truncate">A{c.aisle}</p>
            <p className="text-[8px] font-semibold opacity-80 truncate">{c.name}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] px-1">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-600" /> You
        </span>
        <span>🧪 Tester Bar 1-3</span>
        <span>💗 Wishlist items</span>
      </div>
    </div>
  );
}
