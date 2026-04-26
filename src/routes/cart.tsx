import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { useCart } from "@/hooks/useStorage";
import { products } from "@/data/nykaa";
import { ChevronLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "My Cart — Nykaa" },
      { name: "description", content: "Review your beauty essentials and proceed to checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove } = useCart();
  const detailed = items
    .map((i) => ({ item: i, product: products.find((p) => p.id === i.productId) }))
    .filter((d): d is { item: typeof d.item; product: NonNullable<typeof d.product> } => !!d.product);

  const subtotal = detailed.reduce((s, d) => s + d.product.price * d.item.quantity, 0);
  const original = detailed.reduce((s, d) => s + d.product.originalPrice * d.item.quantity, 0);
  const savings = original - subtotal;
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <MobileShell showHeader={false}>
      <header className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <Link to="/" className="p-1 -ml-1">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-base font-bold flex-1">My Bag ({items.length})</h1>
      </header>

      {detailed.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-bold">Your bag is empty</h2>
          <p className="text-sm text-muted-foreground mt-1">Start shopping for beauty essentials</p>
          <Link to="/" className="mt-6 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg text-sm">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="px-4 pt-4 space-y-3 pb-44">
            {detailed.map(({ item, product }) => (
              <div key={item.productId} className="bg-card rounded-xl border border-border p-3 flex gap-3">
                <div
                  className="w-20 h-20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: product.gradient }}
                >
                  {product.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    {product.brand}
                  </p>
                  <p className="text-sm font-semibold leading-tight line-clamp-2">{product.name}</p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-sm font-bold">₹{product.price}</span>
                    <span className="text-[11px] text-muted-foreground line-through">₹{product.originalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 border border-border rounded-md">
                      <button
                        onClick={() => setQty(item.productId, item.quantity - 1)}
                        className="p-1.5 hover:bg-accent"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => setQty(item.productId, item.quantity + 1)}
                        className="p-1.5 hover:bg-accent"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button onClick={() => remove(item.productId)} className="p-1.5 text-muted-foreground">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-card border border-border rounded-xl p-4 mt-4">
              <h3 className="text-sm font-bold mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <Row label="Subtotal" value={`₹${subtotal}`} />
                <Row label="Discount" value={`- ₹${savings}`} positive />
                <Row label="Shipping" value={shipping === 0 ? "FREE" : `₹${shipping}`} />
                <div className="border-t border-border pt-2 mt-2 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-extrabold text-primary">₹{total}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-full max-w-[440px] bg-background border-t border-border p-3 z-30">
            <button className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-lg text-sm">
              PROCEED TO CHECKOUT • ₹{total}
            </button>
          </div>
        </>
      )}
    </MobileShell>
  );
}

function Row({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={positive ? "text-success font-semibold" : ""}>{value}</span>
    </div>
  );
}
