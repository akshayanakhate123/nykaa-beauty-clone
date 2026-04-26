import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { ProductCard } from "@/components/ProductCard";
import { playCategories, products } from "@/data/nykaa";
import { Search, Bell } from "lucide-react";

export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "Nykaa Play — Beauty Tutorials & Trends" },
      { name: "description", content: "Watch beauty tutorials, discover trending products and learn from experts on Nykaa Play." },
    ],
  }),
  component: PlayPage,
});

function PlayPage() {
  const [active, setActive] = useState(playCategories[0].id);

  return (
    <MobileShell showHeader={false}>
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-baseline gap-1">
          <span className="nykaa-script text-2xl text-primary leading-none">Nykaa</span>
          <span className="font-extrabold text-sm tracking-tight">PLAY</span>
        </div>
        <Bell className="w-5 h-5 text-foreground" />
      </header>

      <div className="px-4 pt-4">
        <div className="bg-gradient-to-br from-pink-50 to-purple-100 rounded-2xl p-4">
          <div className="flex items-center gap-2 bg-background rounded-full px-4 py-2.5 border border-border">
            <Search className="w-4 h-4 text-primary" />
            <input
              placeholder="Search for Best Hydrating Serums"
              className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground"
            />
          </div>
          <p className="text-center text-sm font-bold mt-4 mb-3">
            Trending searches on <span className="nykaa-script text-primary text-lg">Nykaa</span>
            <span className="font-extrabold"> PLAY</span>
          </p>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {playCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className="flex flex-col items-center gap-1 flex-shrink-0"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center text-2xl ring-2 ring-pink-300">
                  {c.emoji}
                </div>
                <span
                  className={`text-[10px] font-semibold ${active === c.id ? "text-primary" : "text-foreground"}`}
                >
                  {c.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="px-4 pt-5">
        <div className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
          <div>
            <p className="font-bold text-sm">WIN BUMPER GIVEAWAYS!</p>
            <p className="text-xs text-muted-foreground">Exclusively For Play Subscribers</p>
          </div>
          <button className="bg-primary text-primary-foreground text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1">
            <Bell className="w-3 h-3" /> Notify Me
          </button>
        </div>
      </section>

      <section className="px-4 pt-5">
        <div className="rounded-2xl overflow-hidden h-56 relative" style={{ background: "var(--gradient-kbeauty)" }}>
          <span className="absolute top-3 right-3 bg-primary text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
            LIVE <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </span>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-lg font-extrabold text-foreground leading-tight uppercase">
              Get that K-drama main character look!
            </h3>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-7xl">💖</div>
        </div>
      </section>

      <section className="px-4 pt-6 pb-4">
        <h2 className="text-sm font-bold mb-3">Featured Products</h2>
        <div className="grid grid-cols-2 gap-3">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </MobileShell>
  );
}
