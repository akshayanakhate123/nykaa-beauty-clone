import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { products } from "@/data/nykaa";
import { useCart, useWishlist } from "@/hooks/useStorage";
import { ChevronLeft, Heart, Star, Truck, RotateCcw, Shield } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — ${loaderData.product.brand} | Nykaa` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Nykaa` },
          { property: "og:description", content: loaderData.product.description },
        ]
      : [{ title: "Product — Nykaa" }],
  }),
  component: ProductDetail,
  notFoundComponent: () => (
    <MobileShell title="Not Found">
      <div className="p-8 text-center">
        <p className="text-sm text-muted-foreground">Product not found.</p>
        <Link to="/" className="text-primary font-semibold text-sm mt-2 inline-block">Go home</Link>
      </div>
    </MobileShell>
  ),
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const fav = has(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const similar = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <MobileShell showHeader={false}>
      <header className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <Link to="/" className="p-1 -ml-1">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <span className="nykaa-script text-2xl text-primary">Nykaa</span>
        <button onClick={() => toggle(product.id)} aria-label="Wishlist">
          <Heart className={`w-5 h-5 ${fav ? "fill-primary text-primary" : ""}`} />
        </button>
      </header>

      <div className="aspect-square flex items-center justify-center text-9xl" style={{ background: product.gradient }}>
        {product.emoji}
      </div>

      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">{product.brand}</p>
        <h1 className="text-lg font-bold mt-1 leading-tight">{product.name}</h1>

        <div className="flex items-center gap-2 mt-2">
          <span className="flex items-center gap-1 bg-success/10 text-success text-xs px-2 py-0.5 rounded font-semibold">
            <Star className="w-3 h-3 fill-current" /> {product.rating}
          </span>
          <span className="text-xs text-muted-foreground">{product.reviews} reviews</span>
        </div>

        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-2xl font-extrabold text-foreground">₹{product.price}</span>
          <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
          <span className="text-sm font-bold text-success">{discount}% OFF</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-5">
          <Feature icon={Truck} label="Free Shipping" />
          <Feature icon={RotateCcw} label="30-Day Returns" />
          <Feature icon={Shield} label="100% Authentic" />
        </div>

        <div className="mt-5">
          <h2 className="text-sm font-bold mb-1">About this product</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        {similar.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-bold mb-3">You might also like</h2>
            <div className="grid grid-cols-2 gap-3">
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-full max-w-[440px] bg-background border-t border-border grid grid-cols-2 z-30">
        <button
          onClick={() => add(product.id)}
          className="py-3.5 text-sm font-bold border-r border-border text-primary hover:bg-accent"
        >
          ADD TO BAG
        </button>
        <Link
          to="/cart"
          onClick={() => add(product.id)}
          className="py-3.5 text-sm font-bold bg-primary text-primary-foreground text-center"
        >
          BUY NOW
        </Link>
      </div>
    </MobileShell>
  );
}

function Feature({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 bg-muted rounded-lg p-2">
      <Icon className="w-4 h-4 text-primary" />
      <span className="text-[10px] text-center font-semibold leading-tight">{label}</span>
    </div>
  );
}
