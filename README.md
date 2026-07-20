# My Little Garden Helper — Website

A modern, SEO-first, **Webflow-ready** static website for **My Little Garden Helper Pty Ltd** — lawn mowing and garden maintenance in the Yarra Valley & Eastern Melbourne.

Built from the approved **Claude Design homepage** (brand kit) and the SEO Optimized Website Strategy, with the design language carried consistently across every page.

## Pages

| URL | File | Purpose |
|-----|------|---------|
| `/` | `index.html` | Homepage |
| `/services/` | `services/index.html` | Services hub |
| `/services/lawn-mowing/` | `services/lawn-mowing/index.html` | Lawn Mowing & Edging |
| `/services/brushcutting/` | `services/brushcutting/index.html` | Brushcutting |
| `/services/hedge-trimming/` | `services/hedge-trimming/index.html` | Hedge Trimming |
| `/services/mulching/` | `services/mulching/index.html` | Mulching |
| `/services/garden-maintenance/` | `services/garden-maintenance/index.html` | Garden Maintenance |
| `/services/weed-control/` | `services/weed-control/index.html` | Weed Control |
| `/services/pruning/` | `services/pruning/index.html` | Pruning |
| `/about/` | `about/index.html` | About |
| `/contact/` | `contact/index.html` | Contact / quote |

## Brand kit (from Claude Design homepage)

- **Forest** `#2f3d26` · **Leaf green** `#6f8f5a` · **Gold** `#f2b545` · **Cream** `#f5f2e9`
- **Display font:** Poppins · **Body font:** Nunito Sans (Google Fonts)
- Tokens, components and utilities live in `assets/styles.css` (CSS custom properties).

## SEO / GEO / AEO

- Unique `<title>`, meta description, canonical, Open Graph & Twitter tags per page.
- Keyword-first H1s and headings targeting *lawn mowing Yarra Valley*, *garden maintenance Eastern Melbourne*, and per-suburb terms (Three Bridges, Healesville, Yarra Glen, Warburton, Lilydale, Belgrave, Ferntree Gully).
- **Schema.org JSON-LD:** `LocalBusiness`, `WebSite`, `Service`, `BreadcrumbList`, `FAQPage`.
- **AEO:** question-and-answer FAQ blocks (direct, citable answers) on the homepage and every service page.
- **GEO:** citable, location-specific statements and a service-area section for AI answer engines.
- `sitemap.xml`, `robots.txt`, descriptive `alt` text, lazy-loaded images, semantic HTML5.

## Webflow-readiness

- Clean, semantic, class-based markup (no build step, no framework runtime).
- Shared `assets/styles.css` and `assets/main.js` — easy to map to Webflow classes/interactions.
- Standard Google Fonts embed; no external JS dependencies.
- Interactions (mobile menu, FAQ accordion, scroll reveal, quote form) are plain vanilla JS and can be re-created with Webflow Interactions, or pasted in as custom code.

## Images

Source photos live in the client's Google Drive folder. Files are referenced from `/assets/` with the names below. Because the build environment's network policy blocks Google Drive, drop the originals into `/assets/` using these exact names before publishing (webP recommended):

| `/assets/` filename | Source (Google Drive) |
|---------------------|------------------------|
| `logo.webp` | `imgi_3_logo_mlgh.webp` |
| `hero.webp` | `imgi_8_Lawn-mowing-1.webp` (wide lawn shot) |
| `lawn-mowing.webp` | `imgi_9_Lawn-mowing-2.webp` |
| `hedge-trimming.webp` | `imgi_10_Hedge-trimming-1.webp` |
| `pruning.webp` | `imgi_11_Hedge-trimming-2.webp` |
| `mulching.webp` | `imgi_14_Mulching-2.webp` |
| `weed-control.webp` | `imgi_15_Mulching-3.webp` |
| `brushcutting.webp` | `imgi_20_Picture-A-before-1.webp` (overgrown) |
| `before.webp` | `imgi_18_Picture-D-before.webp` |
| `after.webp` | `imgi_19_Picture-D-after.webp` |
| `contact.webp` | `imgi_24_contact.webp` |

## Contact form

The quote form is front-end only (shows a success state on submit). Before go-live, connect it to a backend — Webflow Forms, Formspree, or Netlify Forms — by setting the `<form>` `action`/`method` (or Webflow form settings). Notifications should go to `info@mylittlegardenhelper.com.au`.

## Deploying

Static site — host anywhere (Webflow, Netlify, Cloudflare Pages, GitHub Pages). Paths are root-relative, so serve from the domain root. Pretty URLs are folder-based (`/services/lawn-mowing/`).

## Business details

- **My Little Garden Helper Pty Ltd** — 1180 Little Yarra Road, Three Bridges VIC 3797
- Phone **0493 099 984** · Email **info@mylittlegardenhelper.com.au**
- Facebook: https://www.facebook.com/profile.php?id=100083377355214
