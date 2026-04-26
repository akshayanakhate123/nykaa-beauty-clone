import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductCard } from "@/components/ProductCard";
import { NykaaOneCard } from "@/components/NykaaOneCard";
import { StoreModeBanner } from "@/components/StoreModeBanner";
import { categories, brands, spotlights, beautyBooks, products } from "@/data/nykaa";
import { Search, MapPin, ChevronDown, ArrowRight, Package, Camera, Sparkles, Bot } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nykaa — Beauty, Makeup & Skincare Shopping" },
      { name: "description", content: "Shop beauty online or in-store with Nykaa ONE rewards, AI shade match, tester kits & BOPIS pickup." },
      { property: "og:title", content: "Nykaa — Beauty Shopping App" },
      { property: "og:description", content: "Discover K-beauty, top brands, exclusive launches and Nykaa ONE loyalty." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const newLaunches = products.filter((p) => p.isNew);
  return (
    <MobileShell>
      <div className="px-4 pt-2 pb-1 flex items-center gap-1.5">
        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
        <div className="flex flex-col leading-tight">
          <span className="text-[11px] font-bold text-foreground">ADD ADDRESS</span>
          <span className="text-[10px] text-muted-foreground">for faster delivery</span>
        </div>
        <ChevronDown className="w-3 h-3 text-foreground" />
      </div>

      <div className="px-4 pt-2">
        <div className="flex items-center gap-2 bg-muted border border-border rounded-full px-4 py-2.5">
          <Search className="w-4 h-4 text-primary" />
          <input
            placeholder="Search for all products"
            className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <HeroCarousel />

      {/* Nykaa ONE loyalty */}
      <NykaaOneCard />

      {/* Store Mode banner */}
      <StoreModeBanner />

      {/* Categories */}
      <section className="pt-5">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-sm font-bold">Shop by Category</h2>
          <Link to="/category" className="text-xs text-primary font-semibold">View All</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
          {categories.slice(0, 8).map((c) => (
            <button key={c.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 w-20">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-3xl shadow-sm`}>
                {c.emoji}
              </div>
              <span className="text-[11px] font-medium text-foreground text-center leading-tight">{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* AI assistant promo */}
      <section className="px-4 pt-5">
        <Link to="/ai-chat" className="block bg-gradient-to-br from-primary/10 via-purple-50 to-pink-50 border border-primary/20 rounded-2xl p-3 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center flex-shrink-0">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-extrabold">Ask the AI Beauty Expert</p>
            <p className="text-[11px] text-muted-foreground">Recommendations, shade match, store help · Get 20% OFF</p>
          </div>
          <ArrowRight className="w-4 h-4 text-primary" />
        </Link>
      </section>

      {/* Brand strip */}
      <section className="pt-4">
        <div className="px-4 mb-2">
          <h2 className="text-sm font-bold">Picked for You · Brands</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 pb-1">
          {brands.slice(0, 6).map((b) => (
            <div key={b.id} className="flex-shrink-0 bg-card border border-border rounded-xl px-3 py-2 min-w-[110px] text-center">
              <p className="text-xs font-bold text-foreground">{b.name}</p>
              <p className="text-[10px] text-primary font-semibold mt-0.5">{b.discount}</p>
            </div>
          ))}
        </div>
      </section>

      {/* New launch alert */}
      <section className="px-4 pt-6">
        <div className="bg-gradient-to-br from-pink-50 to-white border border-pink-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-sm font-extrabold">Exclusive Launch Alert!</p>
          </div>
          <p className="text-[11px] text-muted-foreground mb-3">You saw it here first. Shop now before everyone else.</p>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1">
            {newLaunches.map((p) => (
              <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="flex-shrink-0 w-32 bg-card rounded-xl border border-border overflow-hidden">
                <div className="aspect-square flex items-center justify-center text-4xl relative" style={{ background: p.gradient }}>
                  <span className="absolute top-1.5 left-1.5 text-[9px] bg-success text-white font-bold px-1.5 py-0.5 rounded">NEW</span>
                  {p.emoji}
                </div>
                <div className="p-2">
                  <p className="text-[9px] uppercase font-bold text-muted-foreground truncate">{p.brand}</p>
                  <p className="text-[11px] font-semibold leading-tight line-clamp-2">{p.name}</p>
                  {p.earlyAccessTier && (
                    <p className="text-[9px] text-amber-700 font-bold mt-0.5">
                      {p.earlyAccessTier === "platinum" ? "Platinum" : p.earlyAccessTier === "gold" ? "Gold+" : "Silver+"} Early Access
                    </p>
                  )}
                  <p className="text-xs font-bold text-foreground mt-1">₹{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlights */}
      <section className="pt-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-sm font-bold">Featured Spotlights</h2>
        </div>
        <div className="px-4 grid grid-cols-2 gap-3">
          {spotlights.map((s) => (
            <div key={s.id} className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="h-20 flex items-center justify-center text-4xl" style={{ background: s.gradient }}>
                {s.emoji}
              </div>
              <div className="p-2.5">
                <h3 className="text-xs font-bold leading-tight">{s.title}</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{s.desc}</p>
                <button className="mt-1.5 text-[10px] font-bold text-primary flex items-center gap-1">
                  Shop Now <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tester kit + AI shade match */}
      <section className="px-4 pt-6 grid grid-cols-2 gap-3">
        <Link to="/tester" className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-xl p-3 flex flex-col items-start">
          <Package className="w-6 h-6 text-info mb-2" />
          <p className="text-xs font-extrabold leading-tight">Ship Your Tester</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Free samples at home</p>
          <span className="mt-2 text-[10px] font-bold text-info">Book Now →</span>
        </Link>
        <Link to="/ai-chat" className="bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200 rounded-xl p-3 flex flex-col items-start">
          <Camera className="w-6 h-6 text-primary mb-2" />
          <p className="text-xs font-extrabold leading-tight">AI Shade Match</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Find your perfect shade</p>
          <span className="mt-2 text-[10px] font-bold text-primary">Try Now →</span>
        </Link>
      </section>

      {/* Help */}
      <section className="px-4 pt-6">
        <div className="bg-warning/10 border-l-4 border-warning rounded-r-lg p-3">
          <p className="text-xs font-bold text-foreground mb-2">Need Help Buying?</p>
          <div className="grid grid-cols-2 gap-2">
            <Link to="/ai-chat" className="bg-background border border-warning/30 text-xs font-semibold py-2 rounded text-center">
              AI Skin Quiz
            </Link>
            <Link to="/tester" className="bg-background border border-warning/30 text-xs font-semibold py-2 rounded text-center">
              Book Tester
            </Link>
          </div>
        </div>
      </section>

      {/* Beauty books */}
      <section className="pt-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-sm font-bold">Beauty Academy & Guides</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
          {beautyBooks.map((b) => (
            <div key={b.id} className="flex-shrink-0 w-40 bg-card border border-border rounded-xl overflow-hidden">
              <div className="h-24 flex items-center justify-center text-4xl" style={{ background: b.gradient }}>
                {b.emoji}
              </div>
              <div className="p-2.5">
                <h3 className="text-xs font-bold leading-tight">{b.title}</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending products */}
      <section className="pt-6 pb-4">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-sm font-bold">Trending Now</h2>
        </div>
        <div className="px-4 grid grid-cols-2 gap-3">
          {products.slice(0, 6).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </MobileShell>
  );
}
