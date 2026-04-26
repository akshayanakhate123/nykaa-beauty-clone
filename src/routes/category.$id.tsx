import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/nykaa";
import { ChevronLeft, SlidersHorizontal, ArrowUpDown } from "lucide-react";

export const Route = createFileRoute("/category/$id")({
  head: () => ({
    meta: [
      { title: "Category — Nykaa" },
      { name: "description", content: "Shop products by category on Nykaa." },
    ],
  }),
  component: CategoryDetail,
});

function CategoryDetail() {
  const { id } = Route.useParams();
  const cat = categories.find((c) => c.id === id);
  const list = cat ? products.filter((p) => p.category === id) : products;
  const display = list.length > 0 ? list : products;

  return (
    <MobileShell showHeader={false}>
      <header className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <Link to="/category" className="p-1 -ml-1">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-base font-bold flex-1">{cat?.name ?? "All Products"}</h1>
      </header>

      <div className="px-4 pt-3 grid grid-cols-2 gap-3 pb-20">
        {display.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-full max-w-[440px] bg-background border-t border-border grid grid-cols-2 z-30">
        <button className="flex items-center justify-center gap-2 py-3 border-r border-border text-sm font-semibold">
          <ArrowUpDown className="w-4 h-4 text-primary" /> Sort
        </button>
        <button className="flex items-center justify-center gap-2 py-3 text-sm font-semibold">
          <SlidersHorizontal className="w-4 h-4 text-primary" /> Filter
        </button>
      </div>
    </MobileShell>
  );
}
