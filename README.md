# Leather Realm Storefront

Next.js storefront for Leather Realm — handmade leather goods. End-to-end
personal project: design, frontend implementation, content modelling, and
deployment.

## Demo

[next-leather-shop.vercel.app](https://next-leather-shop.vercel.app)

## Stack

- Next.js 13 (Pages Router)
- React 18
- SCSS modules
- Material UI icons
- PayPal React SDK (checkout button only)
- Static product catalog (originally backed by a Strapi headless CMS)

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## What's here

- `pages/` — Pages Router (home, products list, product detail, cart, register, profile, auth).
- `components/` — UI primitives (Navbar, FeaturedProduct, ProductsGrid, CartItem, PayPalButton, etc.).
- `styles/` — SCSS modules.
- `products.json` — bundled product catalog.
- `utils/` — cart state, image URL resolution, formatting helpers.

## Status

Originally backed by a Strapi headless CMS hosted on Heroku free tier
(retired November 2022). The storefront now reads the product catalog from the
bundled `products.json` for static-build viability.

The authentication flow and PayPal checkout are wired up but non-functional
without a backend — kept in place to document the original product scope.
