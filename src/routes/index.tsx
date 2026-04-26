import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductCard } from "@/components/ProductCard";
import { categories, brands, spotlights, beautyBooks, products } from "@/data/nykaa";
import { Search, MapPin, ChevronDown, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nykaa — Beauty, Makeup & Skincare Shopping" },
      { name: "description", content: "Shop the best in beauty: makeup, skincare, hair, fragrance & more from your favorite brands." },
      { property: "og:title", content: "Nykaa — Beauty Shopping App" },
      { property: "og:description", content: "Discover K-beauty, top brands, and exclusive deals on Nykaa." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <MobileShell>
      {/* Address bar */}
      <div className="px-4 pt-2 pb-1 flex items-center gap-1.5">
        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
        <div className="flex flex-col leading-tight">
          <span className="text-[11px] font-bold text-foreground">ADD ADDRESS</span>
          <span className="text-[10px] text-muted-foreground">for faster delivery</span>
        </div>
        <ChevronDown className="w-3 h-3 text-foreground" />
      </div>

      {/* Search */}
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

      {/* Categories */}
      <section className="pt-5">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-sm font-bold">Shop by Category</h2>
          <Link to="/category" className="text-xs text-primary font-semibold">
            View All
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
          {categories.slice(0, 8).map((c) => (
            <button key={c.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 w-20">
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-3xl shadow-sm`}
              >
                {c.emoji}
              </div>
              <span className="text-[11px] font-medium text-foreground text-center leading-tight">
                {c.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Brand strip */}
      <section className="pt-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 pb-1">
          {brands.slice(0, 6).map((b) => (
            <div
              key={b.id}
              className="flex-shrink-0 bg-card border border-border rounded-xl px-3 py-2 min-w-[110px] text-center"
            >
              <p className="text-xs font-bold text-foreground">{b.name}</p>
              <p className="text-[10px] text-primary font-semibold mt-0.5">{b.discount}</p>
            </div>
          ))}
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

      {/* Help */}
      <section className="px-4 pt-6">
        <div className="bg-warning/10 border-l-4 border-warning rounded-r-lg p-3">
          <p className="text-xs font-bold text-foreground mb-2">Need Help Buying?</p>
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-background border border-warning/30 text-xs font-semibold py-2 rounded">
              Skin Quiz
            </button>
            <button className="bg-background border border-warning/30 text-xs font-semibold py-2 rounded">
              Live Chat
            </button>
          </div>
        </div>
      </section>

      {/* Beauty books */}
      <section className="pt-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-sm font-bold">Beauty Books & Guides</h2>
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
