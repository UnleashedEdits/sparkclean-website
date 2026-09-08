# Sparkclean Walnut Creek website

Production-ready React + TypeScript + Vite + Tailwind v4 website for Sparkclean Cleaning Services. Motion for React powers page reveals, the planner, and CTA feedback. The customer journey is call-first, so the planning form keeps answers in the browser and hands the visitor to the verified business phone number.

## Run

```bash
npm install
npm run dev
```

Validation: `npm run typecheck`, `npm run lint`, and `npm run build`.

## GitHub Pages

The repository publishes from the `main` branch root. Run `npm run build:pages` before committing so the compiled site is refreshed at the repository root; editable React source remains in `src/`, with `app.html` as its Vite entry.

## Launch boundary

The site is indexable and builds as a static production bundle. The estimate planner does not transmit or store data; visitors call to confirm their clean. Before an owner-controlled launch, replace provisional media with approved originals and confirm the legal name, contact channels, services, radius, policies, pricing, and media permissions recorded in `docs/SOURCE_INVENTORY.md`.
