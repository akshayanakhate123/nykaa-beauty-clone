import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/hooks/useStorage";
import { products } from "@/data/nykaa";
import { ChevronLeft, Heart } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "My Wishlist — Nykaa" },
      { name: "description", content: "Your saved beauty favorites on Nykaa." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { items } = useWishlist();
  const list = items.map((id) => products.find((p) => p.id === id)).filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <MobileShell showHeader={false}>
      <header className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <Link to="/" className="p-1 -ml-1">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-base font-bold flex-1">My Wishlist ({list.length})</h1>
      </header>

      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
            <Heart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-bold">Your wishlist is empty</h2>
          <p className="text-sm text-muted-foreground mt-1">Tap the heart on products you love</p>
          <Link to="/" className="mt-6 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg text-sm">
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="px-4 pt-4 grid grid-cols-2 gap-3 pb-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </MobileShell>
  );
}
