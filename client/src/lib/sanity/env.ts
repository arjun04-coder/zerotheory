/**
 * Sanity connection details.
 *
 * A project id and dataset name are not secrets - they are visible in every
 * request the browser makes - so they are safe to keep in the code. The
 * defaults below point at the ZeroTheory project, and the VITE_ variables
 * override them (useful for a test dataset).
 *
 * Never put an API token in this folder: everything here ships to the browser.
 * The website only reads published content from a public dataset, which needs
 * no token at all.
 */
export const SANITY_PROJECT_ID =
  import.meta.env.VITE_SANITY_PROJECT_ID?.trim() || "qkmsxhv6";

export const SANITY_DATASET =
  import.meta.env.VITE_SANITY_DATASET?.trim() || "production";

/** Pinned so a future API change cannot alter what this site receives. */
export const SANITY_API_VERSION = "2026-09-17";

export const sanityConfigured = Boolean(SANITY_PROJECT_ID && SANITY_DATASET);
