# Archive galleries via Sanity CMS

Built 17 Sep 2026 on branch `update/2026-09-15` (commits `7605d60`, `ce129bf`).
Sanity project `sr3ug5gw`, dataset `production` (public).

## What it does

The four Archive cards (The starting point, Make it real, Build together,
Next up: 2.0) can each hold a photo gallery managed in Sanity.

Cover rule, exactly as asked:

1. No photos in Sanity, or Sanity unreachable / not configured → the card keeps
   the picture that ships with the site. Nothing about the page changes.
2. Photos added but none ticked as cover → the card still shows the shipped
   picture; the gallery opens with the uploaded photos.
3. One photo ticked "Use as card cover" → that photo becomes the card picture.
4. Two ticked → the Studio refuses to publish; if it somehow happened, the site
   uses the first ticked photo.
5. Drafts never show: the query filters `drafts.**` and asks for the published
   perspective.

The cards keep their original look in every state: the arrow badge and the
hover zoom are always there, as they were before this work. A card with photos
additionally becomes clickable and opens the gallery.

## Where the code lives

| Path | Purpose |
|---|---|
| `studio/` | Standalone Sanity Studio: schema, structure, validation |
| `studio/lib/archive-cards.ts` | The four fixed document ids - must match the website data file |
| `client/src/lib/sanity/` | env, fetch, GROQ query, image URLs, cover rules (+ unit tests) |
| `client/src/hooks/useArchiveGalleries.ts` | One fetch on mount; failures keep the placeholders |
| `client/src/components/ArchiveGallery.tsx` | Lightbox: carousel, arrow keys, swipe, captions, counter |
| `client/src/pages/Home.tsx` | `ArchiveCard` + `Archive`, cover selection, lazy dialog |
| `client/src/data/zeroTheory.ts` | `docId` per card, placeholder image per card |

Implementation notes:

- Reads use a plain `fetch` of `https://sr3ug5gw.apicdn.sanity.io/...` rather
  than `@sanity/client`, which would have added about 60 KB gzipped to a
  landing page. No token is involved - the dataset is public and read-only from
  the browser.
- The gallery dialog is `React.lazy`, so the carousel and dialog code (20 KB
  gzipped) only downloads when someone opens a card.
- Initial JS went from 142.6 KB to 147.9 KB gzipped (+5.3 KB).
- Project id and dataset are hard-coded as defaults in
  `client/src/lib/sanity/env.ts`, with `VITE_SANITY_PROJECT_ID` /
  `VITE_SANITY_DATASET` overrides. That way the live site works without anyone
  adding environment variables in Vercel (the Vercel project is not in Anupam's
  Vercel account).

## Verified

- `pnpm check` clean; `pnpm build` clean; 7 unit tests on the cover rules pass.
- Browser tests against mocked CMS responses at 1440x900 and 390x844:
  empty dataset, photos without a cover, photos with a cover, and a failed
  request. Arrow keys move between photos, Escape closes, focus returns to the
  card, captions follow the photo.
- Studio typechecks and builds (`sanity build`).

## Still to do (needs a Sanity login or project owner)

1. **Deploy the schema and the Studio** (on a machine with Node 22.12+), signed
   in as the project owner (Rev, revansh8307@gmail.com, Google login):
   ```
   cd studio
   pnpm install
   npx sanity login
   pnpm dev               # local admin at http://localhost:3333
   pnpm deploy-schema
   pnpm deploy            # hosted admin at https://zerotheory.sanity.studio
   ```
2. **The four cards**: done from here on 22 Sep - `archive-starting-point`,
   `archive-make-it-real`, `archive-build-together`, `archive-next-up` are
   published with empty galleries, so the site still shows the placeholders.
3. **CORS** on `sr3ug5gw`: done from here on 22 Sep - `https://zerotheory.vercel.app`
   and `https://*.vercel.app` may read published content, both without
   credentials. `http://localhost:3333` (Studio) was already allowed.
   `http://localhost:3000` is NOT allowed, so the website's local dev server
   shows placeholders only.
4. **Go live**: the live site reads `sr3ug5gw` only after branch
   `update/2026-09-15` is pushed, merged into `main` and deployed by Vercel.
5. **Token hygiene**: a write token was pasted into chat on 17 Sep (old project
   `qkmsxhv6`) and must be revoked in sanity.io/manage → API → Tokens. Nothing
   in this repo uses it.

## Worth knowing

- Free plan caps: 1M CDN requests, 100 GB bandwidth, 100 GB assets, 10k
  documents per month. If a cap is hit, Sanity returns 402 and the site quietly
  falls back to the placeholder pictures.
- Sanity serves resized WebP through its image CDN, so uploading large photos is
  fine - the site never downloads the original.
- Photos of students, especially anyone under 18, need consent before they go on
  a public page.
- The Studio only manages Archive photos. All page text still lives in
  `client/src/data/zeroTheory.ts`.
