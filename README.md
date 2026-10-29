# Nykaa Beauty Shopping App (Clone)

A mobile-first beauty and cosmetics shopping app inspired by Nykaa, built with React + TypeScript on TanStack Start, styled with Tailwind CSS v4.

🔗 **Live Demo:** [https://enhanced-nykaa-beauty-app.lovable.app/](https://enhanced-nykaa-beauty-app.lovable.app/)

## Overview

This project is a fully functional clone of the Nykaa shopping experience, enhanced with four major feature solutions designed to address real user pain points around discovery, loyalty, and offline-to-online shopping.

### Core Shopping Experience
- 🛍️ Product discovery with hero carousel, categories, and curated rails
- 🛒 Cart, wishlist, and product detail pages
- 👤 Account management
- 📱 Mobile-first UI with bottom tab navigation
- 🎨 Authentic Nykaa color palette and visual language

### Enhanced Features (Iteration 2)

1. **AI-Powered In-App Store Mode** — Toggle a store, view an interactive aisle map, follow a guided shopping path, and chat with a mock AI beauty assistant.
2. **Nykaa ONE Loyalty Program** — Tier-based rewards (Beauty Insider → Icon), points tracking, and exclusive perks.
3. **RITE / BOPIS Engine** — Buy Online Pick-up In Store, express checkout, and home delivery flows.
4. **Try-Before-You-Buy (Tester Program)** — Book product samples shipped to your door.

## Tech Stack

- **Framework:** React 19 + TanStack Start v1
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS v4 with semantic design tokens
- **Routing:** TanStack Router (file-based)
- **State:** Local state + `localStorage` persistence hooks
- **Language:** TypeScript (strict)

## Project Structure

```
src/
├── routes/          # File-based routes (home, cart, product, store-map, ai-chat, loyalty, etc.)
├── components/      # MobileShell, ProductCard, HeroCarousel, NykaaOneCard, StoreModeBanner
├── data/            # Mock product, store, and AI response data
├── hooks/           # useStorage, useStoreMode, useLoyalty, useBopisOrders, useTesterBookings
└── styles.css       # Design tokens and Tailwind theme
```

Open the preview URL printed in the terminal.

## Notes

- AI features are currently mock UI (keyword-based responses).
- Store data is a static mock list.
- All persistence is client-side via `localStorage` — no backend required to try the demo.
