import { SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID, sanityConfigured } from "./env";
import { ARCHIVE_GALLERIES_QUERY } from "./queries";
import type { ArchiveCardDocument } from "./types";

/**
 * Reads published Archive photos straight from Sanity's CDN.
 *
 * This is a plain fetch on purpose: the official @sanity/client adds ~60 KB
 * (gzipped) to the bundle, and all this site needs is one cached GET of public
 * content. No token is involved, so nothing secret ships to the browser.
 */
export async function fetchArchiveGalleries(ids: readonly string[]): Promise<ArchiveCardDocument[]> {
  if (!sanityConfigured || ids.length === 0) return [];

  const url = new URL(
    `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`
  );
  url.searchParams.set("query", ARCHIVE_GALLERIES_QUERY);
  url.searchParams.set("$ids", JSON.stringify(ids));
  url.searchParams.set("perspective", "published");

  const response = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`Sanity responded with ${response.status} ${response.statusText}`);
  }

  const body = (await response.json()) as { result?: ArchiveCardDocument[] };
  return body.result ?? [];
}
