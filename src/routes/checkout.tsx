import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { useCart, useStoreMode, useBopisOrders } from "@/hooks/useStorage";
import { stores, products, tierInfo } from "@/data/nykaa";
import { useLoyalty } from "@/hooks/useStorage";
import { ChevronLeft, Check, Truck, Zap, Store as StoreIcon, QrCode } from "lucide-react";

type Method = "home" | "express" | "bopis";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Nykaa" },
      { name: "description", content: "Choose home delivery, express, or BOPIS pickup at your nearest Nykaa store." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, setQty } = useCart();
  const { storeId: activeStoreId } = useStoreMode();
  const { tier, points } = useLoyalty();
  const { add: addBopis } = useBopisOrders();
  const [method, setMethod] = useState<Method>("home");
  const [bopisStoreId, setBopisStoreId] = useState<string>(activeStoreId ?? stores[0].id);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const detailed = items
    .map((i) => ({ item: i, product: products.find((p) => p.id === i.productId) }))
    .filter((d): d is { item: typeof d.item; product: NonNullable<typeof d.product> } => !!d.product);

  const subtotal = detailed.reduce((s, d) => s + d.product.price * d.item.quantity, 0);
  const original = detailed.reduce((s, d) => s + d.product.originalPrice * d.item.quantity, 0);
  const savings = original - subtotal;
  const shipping =
    method === "bopis" ? 0 : method === "express" ? (tier === "platinum" ? 0 : 99) : subtotal > 500 ? 0 : 49;
  const total = subtotal + shipping;
  const earnedPoints = Math.floor(subtotal / 100) * tierInfo[tier].multiplier;

  const placeOrder = () => {
    const orderId = `NYK-${Date.now().toString().slice(-6)}`;
    if (method === "bopis") {
      addBopis({
        id: orderId,
        storeId: bopisStoreId,
        productIds: detailed.map((d) => d.product.id),
        pickupBy: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        status: "ready",
      });
    }
    detailed.forEach((d) => setQty(d.product.id, 0));
    setConfirmed(orderId);
  };

  if (confirmed) {
    return (
      <MobileShell showHeader={false} hideAiButton>
        <header className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3">
          <h1 className="text-base font-bold text-center">Order Confirmed</h1>
        </header>
        <div className="px-6 pt-12 text-center">
          <div className="w-20 h-20 rounded-full bg-success/15 flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-xl font-extrabold mt-4">Thank you!</h2>
          <p className="text-sm text-muted-foreground mt-1">Order #{confirmed}</p>
          {method === "bopis" ? (
            <div className="mt-6 bg-info/10 border border-info/30 rounded-2xl p-4">
              <QrCode className="w-16 h-16 mx-auto text-info" />
              <p className="text-xs font-bold mt-2">Show this QR at the store</p>
              <p className="text-[11px] text-muted-foreground mt-1">
                Ready for pickup in 2 hours at <span className="font-bold">{stores.find((s) => s.id === bopisStoreId)?.name}</span>
              </p>
            </div>
          ) : (
            <p className="text-sm mt-4">
              Estimated delivery in {method === "express" ? "1 day" : "2-3 days"}.
            </p>
          )}
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-xs font-bold text-amber-900">+{earnedPoints} Nykaa ONE Points earned</p>
            <p className="text-[10px] text-amber-800">{tier} tier · {tierInfo[tier].multiplier}x multiplier</p>
          </div>
          <Link to="/" className="block mt-6 bg-primary text-primary-foreground font-bold py-3 rounded-lg text-sm">
            Continue Shopping
          </Link>
        </div>
      </MobileShell>
    );
  }

  if (detailed.length === 0) {
    return (
      <MobileShell showHeader={false} hideAiButton>
        <header className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
          <Link to="/cart" className="p-1 -ml-1"><ChevronLeft className="w-5 h-5" /></Link>
          <h1 className="text-base font-bold flex-1">Checkout</h1>
        </header>
        <div className="p-8 text-center">
          <p className="text-sm text-muted-foreground">Your bag is empty.</p>
          <Link to="/" className="text-primary font-bold text-sm mt-2 inline-block">Start shopping →</Link>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell showHeader={false} hideAiButton>
      <header className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <Link to="/cart" className="p-1 -ml-1"><ChevronLeft className="w-5 h-5" /></Link>
        <h1 className="text-base font-bold flex-1">Checkout</h1>
      </header>

      <div className="px-4 pt-4 pb-44 space-y-4">
        {/* Delivery options */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Choose delivery</h2>
          <div className="space-y-2">
            <DeliveryOption
              selected={method === "home"}
              onSelect={() => setMethod("home")}
              icon={Truck}
              title="Home Delivery"
              subtitle="Standard · 2-3 days"
              cost={subtotal > 500 ? "FREE" : "₹49"}
            />
            <DeliveryOption
              selected={method === "express"}
              onSelect={() => setMethod("express")}
              icon={Zap}
              title="Express Delivery"
              subtitle="Next day"
              cost={tier === "platinum" ? "FREE (Platinum)" : "₹99"}
              badge={tier === "platinum" ? "PLATINUM" : undefined}
            />
            <DeliveryOption
              selected={method === "bopis"}
              onSelect={() => setMethod("bopis")}
              icon={StoreIcon}
              title="BOPIS — Pick Up In Store"
              subtitle="Ready in 2 hours · QR code"
              cost="FREE"
              badge="NEW"
            />
          </div>
        </section>

        {/* BOPIS store picker */}
        {method === "bopis" && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Pickup store</h2>
            <div className="space-y-2">
              {stores.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setBopisStoreId(s.id)}
                  className={`w-full text-left border-2 rounded-xl p-3 transition ${
                    bopisStoreId === s.id ? "border-primary bg-primary/5" : "border-border bg-card"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold">{s.name}</p>
                      <p className="text-[11px] text-muted-foreground">{s.address}</p>
                    </div>
                    <span className="text-[10px] text-success font-bold">{s.distanceKm} km</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Loyalty */}
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-amber-900">You'll earn +{earnedPoints} pts</p>
              <p className="text-[10px] text-amber-800">{tierInfo[tier].name} tier · {tierInfo[tier].multiplier}x multiplier</p>
            </div>
            <p className="text-[11px] text-amber-900">
              Balance: <span className="font-bold">{points.toLocaleString()}</span>
            </p>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-card border border-border rounded-xl p-4">
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
        </section>
      </div>

      <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-full max-w-[440px] bg-background border-t border-border p-3 z-30">
        <button
          onClick={placeOrder}
          className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-lg text-sm"
        >
          {method === "bopis" ? "RESERVE FOR PICKUP" : "PLACE ORDER"} • ₹{total}
        </button>
      </div>
    </MobileShell>
  );
}

function DeliveryOption({
  selected,
  onSelect,
  icon: Icon,
  title,
  subtitle,
  cost,
  badge,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  cost: string;
  badge?: string;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left border-2 rounded-xl p-3 flex items-center gap-3 transition ${
        selected ? "border-primary bg-primary/5" : "border-border bg-card"
      }`}
    >
      <Icon className={`w-5 h-5 ${selected ? "text-primary" : "text-muted-foreground"}`} />
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-bold">{title}</p>
          {badge && <span className="text-[9px] bg-info text-white font-bold px-1.5 py-0.5 rounded">{badge}</span>}
        </div>
        <p className="text-[11px] text-muted-foreground">{subtitle}</p>
      </div>
      <span className="text-xs font-bold text-success">{cost}</span>
    </button>
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
