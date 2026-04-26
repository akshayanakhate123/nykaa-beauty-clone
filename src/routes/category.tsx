import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { ChevronRight } from "lucide-react";
import { categories } from "@/data/nykaa";

export const Route = createFileRoute("/category")({
  head: () => ({
    meta: [
      { title: "Categories — Shop Nykaa" },
      { name: "description", content: "Browse all Nykaa categories: Makeup, Skincare, Hair, Fragrance, Luxe and more." },
    ],
  }),
  component: CategoryPage,
});

const browseSections = [
  { id: "categories", label: "Categories", emojis: ["💄", "💋", "🧴"], color: "from-pink-100 to-pink-200" },
  { id: "brands", label: "Brands", emojis: ["🅻", "🅼", "🅻"], color: "from-pink-100 to-pink-200" },
  { id: "luxe", label: "Luxe", emojis: ["✨", "👑", "💎"], color: "from-pink-100 to-pink-200" },
  { id: "bestsellers", label: "Bestsellers", emojis: ["⭐", "🔥", "💯"], color: "from-pink-100 to-pink-200" },
  { id: "new", label: "New Launches", emojis: ["🆕", "🌸", "🪞"], color: "from-pink-100 to-pink-200" },
  { id: "gifting", label: "Gift Stores", emojis: ["🎁", "🎀", "💝"], color: "from-pink-100 to-pink-200" },
  { id: "collection", label: "Nykaa Collection", emojis: ["🌟", "💫", "✨"], color: "from-pink-100 to-pink-200" },
  { id: "popups", label: "Pop-ups", emojis: ["🔥", "⚡", "🎯"], color: "from-pink-100 to-pink-200" },
];

function CategoryPage() {
  return (
    <MobileShell title="Shop Nykaa">
      <div className="px-4 pt-3 space-y-3">
        {browseSections.map((s) => (
          <Link
            key={s.id}
            to="/category/$id"
            params={{ id: s.id }}
            className={`flex items-center justify-between bg-gradient-to-r ${s.color} rounded-2xl p-4 hover:shadow-md transition`}
          >
            <span className="text-lg font-bold text-foreground">{s.label}</span>
            <div className="flex -space-x-2">
              {s.emojis.map((e, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full bg-background border-2 border-pink-100 flex items-center justify-center text-xl shadow-sm"
                >
                  {e}
                </div>
              ))}
            </div>
          </Link>
        ))}

        <h2 className="text-sm font-bold pt-4 px-1">All Categories</h2>
        <div className="grid grid-cols-3 gap-3 pb-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/category/$id"
              params={{ id: c.id }}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-3xl`}
              >
                {c.emoji}
              </div>
              <span className="text-[11px] font-medium text-center leading-tight">{c.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}

export { ChevronRight };
