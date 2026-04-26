import { Link, useLocation } from "@tanstack/react-router";
import { Home, LayoutGrid, Play, User, Heart, ShoppingBag, Bell } from "lucide-react";
import { useCart, useWishlist } from "@/hooks/useStorage";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/category", label: "Categories", icon: LayoutGrid },
  { to: "/play", label: "Play", icon: Play },
  { to: "/account", label: "Account", icon: User },
] as const;

export function MobileShell({
  children,
  showHeader = true,
  title,
}: {
  children: React.ReactNode;
  showHeader?: boolean;
  title?: string;
}) {
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const location = useLocation();

  return (
    <div className="min-h-screen flex justify-center bg-muted">
      <div className="relative w-full max-w-[440px] bg-background min-h-screen flex flex-col shadow-2xl">
        {showHeader && (
          <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
            <div className="flex items-center justify-between px-4 py-3">
              {title ? (
                <h1 className="text-xl font-bold tracking-tight">{title}</h1>
              ) : (
                <Link to="/" className="nykaa-script text-3xl text-primary leading-none">
                  Nykaa
                </Link>
              )}
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-full hover:bg-accent transition" aria-label="Notifications">
                  <Bell className="w-5 h-5 text-foreground" />
                </button>
                <Link
                  to="/wishlist"
                  className="p-2 rounded-full hover:bg-accent transition relative"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5 text-foreground" />
                  {wishCount > 0 && (
                    <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {wishCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  className="p-2 rounded-full hover:bg-accent transition relative"
                  aria-label="Cart"
                >
                  <ShoppingBag className="w-5 h-5 text-foreground" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </header>
        )}

        <main className="flex-1 pb-20">{children}</main>

        <nav className="fixed bottom-0 w-full max-w-[440px] z-40 bg-background border-t border-border">
          <div className="grid grid-cols-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active =
                tab.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(tab.to);
              return (
                <Link
                  key={tab.to}
                  to={tab.to}
                  className="flex flex-col items-center justify-center py-2.5 gap-0.5 transition"
                >
                  <Icon
                    className={`w-5 h-5 ${active ? "text-primary fill-primary/20" : "text-muted-foreground"}`}
                  />
                  <span
                    className={`text-[11px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
