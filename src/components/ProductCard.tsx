import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/data/nykaa";
import { useCart, useWishlist } from "@/hooks/useStorage";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const fav = has(product.id);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden flex flex-col">
      <Link to="/product/$id" params={{ id: product.id }} className="relative block">
        <div
          className="aspect-square flex items-center justify-center text-5xl"
          style={{ background: product.gradient }}
        >
          {product.emoji}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id);
          }}
          className="absolute top-2 right-2 bg-background/90 backdrop-blur rounded-full p-1.5 hover:scale-110 transition"
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${fav ? "fill-primary text-primary" : "text-foreground"}`} />
        </button>
        <span className="absolute top-2 left-2 bg-success text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          {discount}% OFF
        </span>
      </Link>
      <div className="p-2.5 flex flex-col gap-1 flex-1">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
          {product.brand}
        </p>
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="text-xs font-semibold leading-tight line-clamp-2 text-foreground">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="flex items-center gap-0.5 bg-success/10 text-success text-[10px] px-1.5 py-0.5 rounded font-semibold">
            <Star className="w-2.5 h-2.5 fill-current" />
            {product.rating}
          </span>
          <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-1.5 mt-auto pt-1">
          <span className="text-sm font-bold text-foreground">₹{product.price}</span>
          <span className="text-[11px] text-muted-foreground line-through">₹{product.originalPrice}</span>
        </div>
        <button
          onClick={() => add(product.id)}
          className="mt-1 w-full bg-primary hover:bg-primary-glow text-primary-foreground text-[11px] font-bold py-1.5 rounded-md transition"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
