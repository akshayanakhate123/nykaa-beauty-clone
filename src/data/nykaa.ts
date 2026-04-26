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
  isNew?: boolean;
  hasTester?: boolean;
  testerBar?: number;
  inStoreStock?: number;
  aisle?: number;
  earlyAccessTier?: "silver" | "gold" | "platinum";
};

export const categories = [
  { id: "makeup", name: "Makeup", emoji: "💄", color: "from-pink-200 to-rose-300", aisle: 3 },
  { id: "skin", name: "Skin", emoji: "🧴", color: "from-sky-200 to-blue-300", aisle: 5 },
  { id: "hair", name: "Hair", emoji: "💆", color: "from-orange-200 to-amber-300", aisle: 7 },
  { id: "body", name: "Bath & Body", emoji: "🧼", color: "from-emerald-200 to-teal-300", aisle: 9 },
  { id: "luxe", name: "Luxe", emoji: "✨", color: "from-amber-200 to-yellow-300", aisle: 1 },
  { id: "fragrance", name: "Fragrance", emoji: "🌸", color: "from-fuchsia-200 to-pink-300", aisle: 4 },
  { id: "wellness", name: "Wellness", emoji: "💊", color: "from-lime-200 to-green-300", aisle: 11 },
  { id: "appliances", name: "Appliances", emoji: "📱", color: "from-indigo-200 to-blue-300", aisle: 12 },
  { id: "gifting", name: "Gifting", emoji: "🎁", color: "from-red-200 to-pink-300", aisle: 2 },
  { id: "mom-baby", name: "Mom & Baby", emoji: "👶", color: "from-yellow-200 to-orange-300", aisle: 10 },
  { id: "men", name: "Men's Grooming", emoji: "💈", color: "from-slate-200 to-zinc-300", aisle: 8 },
  { id: "korean", name: "K-Beauty", emoji: "🇰🇷", color: "from-purple-200 to-fuchsia-300", aisle: 6 },
];

export const heroBanners = [
  { id: 1, title: "K-Beauty Festival", subtitle: "K-pop glam, glass hair, skin rituals — discover Korean beauty", cta: "Explore Now", gradient: "var(--gradient-kbeauty)", emoji: "🌸", inStore: false },
  { id: 2, title: "Special Offer", subtitle: "Up to 50% OFF on top brands", cta: "Shop Sale", gradient: "var(--gradient-hero)", emoji: "💄", inStore: false },
  { id: 3, title: "🎯 NYKAA LUXE — The CHEEK Edit", subtitle: "In-Store Exclusive · Limited Time", cta: "View at Store", gradient: "var(--gradient-coral)", emoji: "💋", inStore: true },
  { id: 4, title: "Tester Kit Available", subtitle: "Try before you buy — Free home sampling", cta: "Book Now", gradient: "var(--gradient-blue)", emoji: "🧪", inStore: false },
  { id: 5, title: "Free Shipping", subtitle: "On all orders above ₹500", cta: "Start Shopping", gradient: "var(--gradient-green)", emoji: "🛍️", inStore: false },
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
  { id: "p1", name: "Velvet Matte Lipstick", brand: "MAC", price: 1299, originalPrice: 1799, rating: 4.5, reviews: 234, emoji: "💄", category: "makeup", gradient: "var(--gradient-hero)", description: "Long-lasting matte finish that stays put for hours.", hasTester: true, testerBar: 3, inStoreStock: 12, aisle: 3 },
  { id: "p2", name: "Hydrating Glow Serum", brand: "The Ordinary", price: 899, originalPrice: 1199, rating: 4.7, reviews: 1245, emoji: "🧴", category: "skin", gradient: "var(--gradient-blue)", description: "Hyaluronic acid serum for plump, hydrated skin.", inStoreStock: 45, aisle: 5 },
  { id: "p3", name: "Liquid Eyeliner Pen", brand: "Maybelline", price: 549, originalPrice: 799, rating: 4.4, reviews: 567, emoji: "✏️", category: "makeup", gradient: "var(--gradient-hero)", description: "Precision tip for sharp, defined lines.", hasTester: true, testerBar: 3, inStoreStock: 8, aisle: 3 },
  { id: "p4", name: "Nourishing Shampoo", brand: "L'Oréal Paris", price: 449, originalPrice: 599, rating: 4.3, reviews: 892, emoji: "🧴", category: "hair", gradient: "var(--gradient-orange)", description: "Sulfate-free formula for damaged hair.", inStoreStock: 22, aisle: 7 },
  { id: "p5", name: "Rose Body Mist", brand: "Bath & Body", price: 999, originalPrice: 1299, rating: 4.6, reviews: 412, emoji: "🌹", category: "fragrance", gradient: "var(--gradient-coral)", description: "Refreshing rose body mist with light floral notes.", hasTester: true, testerBar: 2, inStoreStock: 2, aisle: 4 },
  { id: "p6", name: "K-Beauty Glow Essence", brand: "AESTURA", price: 1599, originalPrice: 1999, rating: 4.8, reviews: 678, emoji: "💧", category: "korean", gradient: "var(--gradient-kbeauty)", description: "Korean beauty essence for glass-skin glow.", isNew: true, earlyAccessTier: "gold", inStoreStock: 15, aisle: 6 },
  { id: "p7", name: "Cushion Foundation", brand: "Lakmé", price: 1199, originalPrice: 1499, rating: 4.5, reviews: 943, emoji: "🪞", category: "makeup", gradient: "var(--gradient-hero)", description: "Lightweight cushion foundation with SPF protection.", hasTester: true, testerBar: 3, inStoreStock: 0, aisle: 3 },
  { id: "p8", name: "Eau de Parfum", brand: "Chanel", price: 8999, originalPrice: 10999, rating: 4.9, reviews: 234, emoji: "🌸", category: "fragrance", gradient: "var(--gradient-blue)", description: "Iconic floral fragrance, timeless and elegant.", earlyAccessTier: "platinum", inStoreStock: 5, aisle: 1 },
  { id: "p9", name: "Sunscreen SPF 50", brand: "Neutrogena", price: 599, originalPrice: 799, rating: 4.6, reviews: 2345, emoji: "☀️", category: "skin", gradient: "var(--gradient-orange)", description: "Broad spectrum sunscreen for daily wear.", inStoreStock: 60, aisle: 5 },
  { id: "p10", name: "Highlighter Palette", brand: "Huda Beauty", price: 2499, originalPrice: 3199, rating: 4.7, reviews: 567, emoji: "✨", category: "makeup", gradient: "var(--gradient-kbeauty)", description: "Multi-shade highlighter for that lit-from-within glow.", isNew: true, hasTester: true, testerBar: 3, earlyAccessTier: "silver", inStoreStock: 18, aisle: 3 },
  { id: "p11", name: "Pillow Talk Lip Kit", brand: "Charlotte Tilbury", price: 3499, originalPrice: 3999, rating: 4.9, reviews: 312, emoji: "💋", category: "luxe", gradient: "var(--gradient-coral)", description: "The iconic nude pink lip combination, in a curated kit.", isNew: true, hasTester: true, testerBar: 1, earlyAccessTier: "platinum", inStoreStock: 4, aisle: 1 },
  { id: "p12", name: "Glow Serum Booster", brand: "Kay Beauty", price: 799, originalPrice: 999, rating: 4.6, reviews: 189, emoji: "✨", category: "skin", gradient: "var(--gradient-blue)", description: "Radiance-boosting serum for everyday glow.", isNew: true, inStoreStock: 30, aisle: 5 },
];

export const playCategories = [
  { id: "kbeauty", name: "K-Beauty Picks", emoji: "🌸" },
  { id: "cushion", name: "Cushion Foundation", emoji: "🪞" },
  { id: "essentials", name: "Skincare Essentials", emoji: "🧴" },
  { id: "popular", name: "Popular Now", emoji: "🔥" },
];

// ============= Store Mode / RITE / BOPIS =============

export type Store = {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  hours: string;
  testerBars: number;
  features: string[];
};

export const stores: Store[] = [
  { id: "luxe-bandra", name: "Nykaa LUXE Bandra", address: "Linking Road, Bandra West, Mumbai", distanceKm: 0.5, hours: "10 AM – 10 PM", testerBars: 4, features: ["Tester Bars", "BOPIS", "Personal Shopper"] },
  { id: "luxe-pvr", name: "Nykaa LUXE PVR Mall", address: "Phoenix Mall, Lower Parel, Mumbai", distanceKm: 2.3, hours: "11 AM – 9 PM", testerBars: 3, features: ["Tester Bars", "BOPIS"] },
  { id: "on-trend-andheri", name: "Nykaa On Trend Andheri", address: "Infinity Mall, Andheri West, Mumbai", distanceKm: 4.8, hours: "10 AM – 10 PM", testerBars: 2, features: ["BOPIS"] },
  { id: "luxe-juhu", name: "Nykaa LUXE Juhu", address: "Juhu Tara Road, Mumbai", distanceKm: 6.2, hours: "10 AM – 11 PM", testerBars: 5, features: ["Tester Bars", "BOPIS", "Personal Shopper", "Beauty Studio"] },
];

// ============= Loyalty / Nykaa ONE =============

export type Tier = "bronze" | "silver" | "gold" | "platinum";

export const tierInfo: Record<Tier, {
  name: string;
  pointsRequired: number;
  multiplier: number;
  earlyAccessHours: number;
  color: string;
  benefits: string[];
}> = {
  bronze: {
    name: "Bronze",
    pointsRequired: 0,
    multiplier: 1,
    earlyAccessHours: 0,
    color: "#CD7F32",
    benefits: ["1x points on all purchases", "Free shipping on orders > ₹500", "Birthday surprise"],
  },
  silver: {
    name: "Silver",
    pointsRequired: 2500,
    multiplier: 1.5,
    earlyAccessHours: 12,
    color: "#C0C0C0",
    benefits: ["1.5x points on all purchases", "Free shipping on orders > ₹250", "Birthday + monthly surprises", "Priority customer support", "12h early access to launches"],
  },
  gold: {
    name: "Gold",
    pointsRequired: 5000,
    multiplier: 2,
    earlyAccessHours: 24,
    color: "#FFD700",
    benefits: ["2x points on all purchases", "Free shipping on all orders", "Birthday + monthly + quarterly surprises", "Priority support", "24h early access to sales", "Exclusive Gold-only products"],
  },
  platinum: {
    name: "Platinum",
    pointsRequired: 10000,
    multiplier: 3,
    earlyAccessHours: 48,
    color: "#E5E4E2",
    benefits: ["3x points on all purchases", "Free express (1-day) shipping", "VIP perks (annual surprise)", "Dedicated concierge", "48h early access", "Exclusive Platinum collection", "In-store personal shopping"],
  },
};

// ============= AI Assistant canned responses =============

export const aiSuggestions = [
  "Recommend makeup for oily skin",
  "Where's the nearest Nykaa store?",
  "How do I earn more Nykaa ONE points?",
  "Can I get a tester kit?",
  "Help me find a foundation shade",
];

export const aiResponses: Record<string, string> = {
  default: "Hi! I'm your Nykaa AI Assistant. I can help with product recommendations, store navigation, loyalty points, tester kits and more. What would you like to know?",
  oily: "For oily skin, I recommend the **Hydrating Glow Serum** by The Ordinary — oil-free, lightweight, and great under makeup. It's available in-store at Aisle 5 (Skin) or online with 25% OFF today. ✨",
  store: "The nearest store is **Nykaa LUXE Bandra** (0.5 km away) on Linking Road. Open today till 10 PM. Tap the Store Mode toggle in the header to activate in-store features.",
  points: "You can earn Nykaa ONE Points by:\n• Shopping online or in-store (1-3x by tier)\n• Daily app check-ins (+10 each)\n• Monthly store visits (+50)\n• Booking tester kits & converting (+25)\n• Reviewing products (+15)",
  tester: "Yes! Tap **Book Tester Kit** on the home screen, choose 3-5 products, and we'll ship samples in 2-3 days. After trying, you'll get an exclusive 20% OFF code (AFTERTESTING20) on the products.",
  shade: "Try our **AI Shade Match** — upload a selfie and our AI analyzes your skin tone to recommend the perfect foundation, lipstick or blush shades. You can also try the matched shades at Tester Bar 3 in your nearest LUXE store!",
};
