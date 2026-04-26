import { Link } from "@tanstack/react-router";
import { useStoreMode } from "@/hooks/useStorage";
import { stores } from "@/data/nykaa";
import { MapPin, Navigation, Tag, ChevronRight } from "lucide-react";

export function StoreModeBanner() {
  const { active, storeId } = useStoreMode();
  const store = stores.find((s) => s.id === storeId);

  if (!active || !store) {
    return (
      <Link
        to="/store-map"
        className="block mx-4 mt-3 rounded-2xl bg-gradient-to-br from-primary/10 via-pink-50 to-amber-50 border border-primary/20 p-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold">Activate Store Mode</p>
              <p className="text-[11px] text-muted-foreground">In-store offers · Aisle navigation · BOPIS</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-primary" />
        </div>
      </Link>
    );
  }

  return (
    <div className="mx-4 mt-3 rounded-2xl overflow-hidden bg-gradient-to-br from-success to-emerald-600 text-white shadow-lg">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <p className="text-[10px] font-bold uppercase tracking-wider">In-Store Mode Active</p>
          </div>
          <p className="text-[10px] font-mono opacity-90">Active for 00:35</p>
        </div>
        <p className="text-base font-extrabold leading-tight">{store.name}</p>
        <p className="text-[11px] opacity-90 mt-0.5">{store.address}</p>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <Link
            to="/store-map"
            className="bg-white text-success font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5"
          >
            <Navigation className="w-3.5 h-3.5" />
            GUIDED PATH
          </Link>
          <button className="bg-white/20 backdrop-blur text-white font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            IN-STORE OFFERS
          </button>
        </div>
      </div>
    </div>
  );
}
