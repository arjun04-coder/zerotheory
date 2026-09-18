# ZeroTheory Studio

Sanity Studio for the ZeroTheory website. It manages the photo galleries behind
the four Archive cards - nothing else. All page text lives in the website code.

- Project: `qkmsxhv6`
- Dataset: `production` (public - anyone can read published content, which is
  what lets the website load photos without a secret key)
- Hosted Studio: https://zerotheory.sanity.studio (after the first deploy)

## Running it locally

Needs Node.js 22.12 or newer.

```bash
cd studio
pnpm install
pnpm dev          # http://localhost:3333
```

## Deploying

```bash
cd studio
npx sanity login          # once per machine, opens a browser
pnpm deploy-schema        # uploads the schema (needed by MCP/AI tools)
pnpm deploy               # publishes the Studio to zerotheory.sanity.studio
```

## How editors use it

1. Open the Studio and sign in.
2. **Archive cards** -> pick a card (for example *Build together*).
3. **Photos** -> add a photo, fill in **Alt text** (required), add a caption if
   useful.
4. Tick **Use as card cover** on one photo to replace the placeholder picture on
   that card. Leave every photo unticked and the card keeps the placeholder.
5. Press **Publish**. The website picks the change up within about a minute.

Only one photo per card can be the cover; the Studio blocks publishing if two
are ticked.
