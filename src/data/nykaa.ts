export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  emoji: string;
  category: string;
  gradient: string;
  description: string;
};

export const categories = [
  { id: "makeup", name: "Makeup", emoji: "💄", color: "from-pink-200 to-rose-300" },
  { id: "skin", name: "Skin", emoji: "🧴", color: "from-sky-200 to-blue-300" },
  { id: "hair", name: "Hair", emoji: "💆", color: "from-orange-200 to-amber-300" },
  { id: "body", name: "Bath & Body", emoji: "🧼", color: "from-emerald-200 to-teal-300" },
  { id: "luxe", name: "Luxe", emoji: "✨", color: "from-amber-200 to-yellow-300" },
  { id: "fragrance", name: "Fragrance", emoji: "🌸", color: "from-fuchsia-200 to-pink-300" },
  { id: "wellness", name: "Wellness", emoji: "💊", color: "from-lime-200 to-green-300" },
  { id: "appliances", name: "Appliances", emoji: "📱", color: "from-indigo-200 to-blue-300" },
  { id: "gifting", name: "Gifting", emoji: "🎁", color: "from-red-200 to-pink-300" },
  { id: "mom-baby", name: "Mom & Baby", emoji: "👶", color: "from-yellow-200 to-orange-300" },
  { id: "men", name: "Men's Grooming", emoji: "💈", color: "from-slate-200 to-zinc-300" },
  { id: "korean", name: "K-Beauty", emoji: "🇰🇷", color: "from-purple-200 to-fuchsia-300" },
];

export const heroBanners = [
  {
    id: 1,
    title: "K-Beauty Festival",
    subtitle: "K-pop glam, glass hair, skin rituals — discover Korean beauty",
    cta: "Explore Now",
    gradient: "var(--gradient-kbeauty)",
    emoji: "🌸",
  },
  {
    id: 2,
    title: "Special Offer",
    subtitle: "Up to 50% OFF on top brands",
    cta: "Shop Sale",
    gradient: "var(--gradient-hero)",
    emoji: "💄",
  },
  {
    id: 3,
    title: "Summer Collection",
    subtitle: "New arrivals you'll love",
    cta: "View Collection",
    gradient: "var(--gradient-coral)",
    emoji: "🌞",
  },
  {
    id: 4,
    title: "Premium Brands",
    subtitle: "Luxury beauty essentials",
    cta: "Shop Luxe",
    gradient: "var(--gradient-blue)",
    emoji: "✨",
  },
  {
    id: 5,
    title: "Free Shipping",
    subtitle: "On all orders above ₹500",
    cta: "Start Shopping",
    gradient: "var(--gradient-green)",
    emoji: "🛍️",
  },
];

export const brands = [
  { id: "mac", name: "MAC", discount: "20% OFF" },
  { id: "ct", name: "Charlotte Tilbury", discount: "15% OFF" },
  { id: "el", name: "Estée Lauder", discount: "25% OFF" },
  { id: "ud", name: "Urban Decay", discount: "30% OFF" },
  { id: "nars", name: "NARS", discount: "18% OFF" },
  { id: "bb", name: "Bobbi Brown", discount: "22% OFF" },
  { id: "tf", name: "Too Faced", discount: "20% OFF" },
  { id: "fenty", name: "Fenty Beauty", discount: "25% OFF" },
  { id: "lakme", name: "Lakmé", discount: "15% OFF" },
  { id: "maybelline", name: "Maybelline", discount: "30% OFF" },
];

export const spotlights = [
  { id: "nail", title: "Nail Art Essentials", desc: "Complete your nail collection", emoji: "💅", gradient: "var(--gradient-coral)" },
  { id: "lips", title: "Trending Lipsticks", desc: "Latest shades in stock", emoji: "💋", gradient: "var(--gradient-hero)" },
  { id: "skincare", title: "Skincare Solutions", desc: "Glow from within", emoji: "🧴", gradient: "var(--gradient-blue)" },
  { id: "eyes", title: "Eyes on You", desc: "Eye makeup collection", emoji: "👁️", gradient: "var(--gradient-kbeauty)" },
];

export const beautyBooks = [
  { id: "skin101", title: "Skincare 101", desc: "Complete guide to skincare routine", emoji: "📚", gradient: "var(--gradient-orange)" },
  { id: "makeup-mc", title: "Makeup Masterclass", desc: "Tips from beauty experts", emoji: "🎨", gradient: "var(--gradient-blue)" },
  { id: "hair-guide", title: "Hair Care Guide", desc: "Achieve healthy, shiny hair", emoji: "💆", gradient: "var(--gradient-kbeauty)" },
  { id: "fragrance-g", title: "Fragrance Guide", desc: "Find your signature scent", emoji: "🌸", gradient: "var(--gradient-hero)" },
];

export const products: Product[] = [
  { id: "p1", name: "Velvet Matte Lipstick", brand: "MAC", price: 1299, originalPrice: 1799, rating: 4.5, reviews: 234, emoji: "💄", category: "makeup", gradient: "var(--gradient-hero)", description: "Long-lasting matte finish that stays put for hours." },
  { id: "p2", name: "Hydrating Glow Serum", brand: "The Ordinary", price: 899, originalPrice: 1199, rating: 4.7, reviews: 1245, emoji: "🧴", category: "skin", gradient: "var(--gradient-blue)", description: "Hyaluronic acid serum for plump, hydrated skin." },
  { id: "p3", name: "Liquid Eyeliner Pen", brand: "Maybelline", price: 549, originalPrice: 799, rating: 4.4, reviews: 567, emoji: "✏️", category: "makeup", gradient: "var(--gradient-hero)", description: "Precision tip for sharp, defined lines." },
  { id: "p4", name: "Nourishing Shampoo", brand: "L'Oréal Paris", price: 449, originalPrice: 599, rating: 4.3, reviews: 892, emoji: "🧴", category: "hair", gradient: "var(--gradient-orange)", description: "Sulfate-free formula for damaged hair." },
  { id: "p5", name: "Rose Body Mist", brand: "Bath & Body", price: 999, originalPrice: 1299, rating: 4.6, reviews: 412, emoji: "🌹", category: "fragrance", gradient: "var(--gradient-coral)", description: "Refreshing rose body mist with light floral notes." },
  { id: "p6", name: "K-Beauty Essence", brand: "AESTURA", price: 1599, originalPrice: 1999, rating: 4.8, reviews: 678, emoji: "💧", category: "korean", gradient: "var(--gradient-kbeauty)", description: "Korean beauty essence for glass-skin glow." },
  { id: "p7", name: "Cushion Foundation", brand: "Lakmé", price: 1199, originalPrice: 1499, rating: 4.5, reviews: 943, emoji: "🪞", category: "makeup", gradient: "var(--gradient-hero)", description: "Lightweight cushion foundation with SPF protection." },
  { id: "p8", name: "Eau de Parfum", brand: "Chanel", price: 8999, originalPrice: 10999, rating: 4.9, reviews: 234, emoji: "🌸", category: "fragrance", gradient: "var(--gradient-blue)", description: "Iconic floral fragrance, timeless and elegant." },
  { id: "p9", name: "Sunscreen SPF 50", brand: "Neutrogena", price: 599, originalPrice: 799, rating: 4.6, reviews: 2345, emoji: "☀️", category: "skin", gradient: "var(--gradient-orange)", description: "Broad spectrum sunscreen for daily wear." },
  { id: "p10", name: "Highlighter Palette", brand: "Huda Beauty", price: 2499, originalPrice: 3199, rating: 4.7, reviews: 567, emoji: "✨", category: "makeup", gradient: "var(--gradient-kbeauty)", description: "Multi-shade highlighter for that lit-from-within glow." },
];

export const playCategories = [
  { id: "kbeauty", name: "K-Beauty Picks", emoji: "🌸" },
  { id: "cushion", name: "Cushion Foundation", emoji: "🪞" },
  { id: "essentials", name: "Skincare Essentials", emoji: "🧴" },
  { id: "popular", name: "Popular Now", emoji: "🔥" },
];
