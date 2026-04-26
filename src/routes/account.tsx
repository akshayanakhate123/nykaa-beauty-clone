import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { useCart, useWishlist } from "@/hooks/useStorage";
import {
  Package,
  Ticket,
  Wallet,
  Bell,
  Crown,
  ChevronRight,
  Heart,
  Mail,
  LogOut,
} from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Nykaa" },
      { name: "description", content: "Manage your Nykaa account, orders, wallet, coupons and preferences." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();

  return (
    <MobileShell showHeader={false}>
      <div className="bg-muted px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-extrabold leading-tight">Hey</p>
            <p className="text-2xl font-extrabold leading-tight">Nykaa User</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center text-white font-bold text-xl">
            N
          </div>
        </div>

        <div className="bg-background rounded-xl p-4 border border-border">
          <p className="font-bold text-sm">Become a Privé Member</p>
          <p className="text-xs text-muted-foreground">Earn everytime you shop</p>
          <div className="border-t border-border mt-3 pt-3 flex items-center justify-between">
            <p className="text-xs">
              <span className="text-success font-bold">Shop for ₹2000</span> before 26-04-2027 to unlock
              exclusive Privé benefits <span className="text-primary font-bold">Learn More!</span>
            </p>
            <ChevronRight className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>

      <p className="px-4 pt-3 text-xs text-muted-foreground">Logged in via 9575535987</p>

      <div className="px-4 pt-2">
        <Section>
          <Row icon={Package} label="Orders" desc="Check your orders status (track, return, cancel etc)" badge="2" to="/account" />
          <Row icon={Heart} label="Wishlist" desc="Your favorite products in one place" badge={wishCount > 0 ? String(wishCount) : undefined} to="/wishlist" />
          <Row icon={Ticket} label="Coupons" desc="Browse coupons to get discount on Nykaa" badge="5" badgeColor="bg-success" to="/account" />
          <Row icon={Wallet} label="Wallet" desc="Check your Nykaa Wallet balance" badge="₹250" badgeColor="bg-info" to="/account" />
        </Section>

        <Section title="Rewards & Benefits">
          <Row icon={Crown} label="Nykaa Privé" desc="Shop for > ₹2000 to become a member" badge="New" badgeColor="bg-gradient-to-r from-pink-400 to-purple-500" to="/account" />
        </Section>

        <Section title="Preferences">
          <Row icon={Bell} label="Never Miss an Update" desc="Enable notifications to get live order updates & offers" toggle to="/account" />
          <Row icon={Mail} label="Email Preferences" desc="Manage promotional & newsletter emails" to="/account" />
          <Row icon={LogOut} label="Logout" desc="Sign out of your account" danger to="/account" />
        </Section>

        <p className="text-center text-xs text-muted-foreground py-6">
          Cart items: {cartCount} • Wishlist: {wishCount}
        </p>
      </div>
    </MobileShell>
  );
}

function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="mb-2">
      {title && <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1 pt-3 pb-1">{title}</h3>}
      <div className="bg-background">{children}</div>
    </div>
  );
}

type RowProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc: string;
  badge?: string;
  badgeColor?: string;
  toggle?: boolean;
  danger?: boolean;
  to: "/account" | "/wishlist" | "/cart";
};

function Row({ icon: Icon, label, desc, badge, badgeColor = "bg-primary", toggle, danger, to }: RowProps) {
  return (
    <Link to={to} className="flex items-start justify-between gap-3 py-4 border-b border-border">
      <div className="flex items-start gap-3 flex-1">
        <Icon className={`w-5 h-5 mt-0.5 ${danger ? "text-destructive" : "text-foreground"}`} />
        <div className="flex-1">
          <p className={`text-sm font-bold ${danger ? "text-destructive" : "text-foreground"}`}>{label}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      {toggle ? (
        <div className="w-10 h-6 rounded-full bg-muted relative">
          <div className="w-5 h-5 rounded-full bg-background border border-border absolute top-0.5 left-0.5" />
        </div>
      ) : badge ? (
        <span className={`${badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
          {badge}
        </span>
      ) : (
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      )}
    </Link>
  );
}
