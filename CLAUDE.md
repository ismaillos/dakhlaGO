# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server at http://localhost:3000
npm run build     # tsc type-check + vite production build → dist/
npm run lint      # eslint (flat config, react-hooks + react-refresh rules)
npm run preview   # serve the dist/ build locally
```

No test runner is installed.

## Architecture

**Pure frontend SPA** — no backend. Orders are sent to a Google Apps Script webhook; browsing is 100% client-side.

### Routing (`src/main.tsx` → `src/App.tsx`)

Uses `HashRouter` (static-hosting friendly). Four routes: `/`, `/produit/:id`, `/blog`, `/blog/:id`, plus a `*` catch-all for 404.

### Data layer (`src/data/`)

All content is static TypeScript: `products.ts` (Product interface + PRODUCTS array + CATEGORIES + WHATSAPP_NUMBER), `blog.ts` (BlogArticle interface + BLOG_ARTICLES), `reviews.ts`. No API fetches for content — edit these files to add/change products or articles.

### Cart state (`src/hooks/useCart.tsx`)

React Context wrapping all pages via `<CartProvider>` in `App.tsx`. State is persisted to `localStorage` under the key `dakhla-cart`. Exports: `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `openModal/closeModal`, `total`, `itemCount`.

### Order submission (`src/lib/api.ts`)

Single `submitOrder(payload)` function. Reads `VITE_SHEET_WEBHOOK_URL` from env; returns `false` (without throwing) if the URL is missing or still contains `PLACEHOLDER`. Uses `mode: 'no-cors'` — responses are always opaque, so success is assumed on dispatch.

Two payload shapes:
- `type: 'single'` — from `OrderForm` (single-product page): `{ nom, telephone, adresse, ville, produit, quantite, prix }`
- `type: 'cart'` — from `OrderModal` checkout step: `{ nom, telephone, adresse, ville, items (formatted string), total }`

### Order form flow

- **`OrderForm`** (used on `/produit/:id`) — single-product order with quantity tiers. Zod validates all fields before submission; shows an error screen with retry + WhatsApp fallback on failure.
- **`OrderModal`** — cart-based 3-step modal: `cart` (item list + qty controls) → `checkout` (Zod-validated delivery form → Sheets) → `success` (timeline + optional WhatsApp link). Triggered by `addItem()` or `openModal()`.

### Styling conventions

Tailwind CSS only — no CSS modules. Theme tokens defined as CSS variables in `src/index.css` and extended in `tailwind.config.js`: key colors are `#E8732F` (orange/CTA), `#D4A574` (gold), `#5B7B5E` (green). Dark base `#0a0a0a` / card `#141414`. The custom class `gold-border` is a recurring card border style.

Inline SVG icons are defined as local arrow-function components at the top of each file — there is no shared icon component.

### Google Apps Script (`apps-script.gs`)

Deployed as a Web App. Sheet ID is `1SsoBsyTOH7t57CiVZWVdn1TzevHDOEh8dAxDl6iQnZw`, tab name `dakhlacommande`. After editing this file, redeploy the script as a new deployment and update `VITE_SHEET_WEBHOOK_URL` in `.env`.

### Environment variables

```
VITE_SHEET_WEBHOOK_URL   # Google Apps Script Web App URL
VITE_WHATSAPP_NUMBER     # International format, no + (default: 212677031561)
```

See `.env.example`. Vite exposes these as `import.meta.env.VITE_*`.

### Path alias

`@/` resolves to `src/` (configured in `vite.config.ts`).
