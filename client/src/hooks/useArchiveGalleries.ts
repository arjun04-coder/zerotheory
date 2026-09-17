import { useEffect, useState } from "react";
import { fetchArchiveGalleries, toGalleries } from "@/lib/sanity";
import type { ArchiveGalleries } from "@/lib/sanity";

/**
 * Loads the Archive photo galleries from Sanity once, on mount.
 *
 * Returns an empty object until (or unless) content arrives, which is what
 * keeps the cards on their built-in placeholder pictures when the CMS is
 * empty, unreachable or not configured.
 */
export function useArchiveGalleries(ids: readonly string[]): ArchiveGalleries {
  const [galleries, setGalleries] = useState<ArchiveGalleries>({});
  const key = ids.join(",");

  useEffect(() => {
    let cancelled = false;

    fetchArchiveGalleries(key.split(","))
      .then((docs) => {
        if (!cancelled) setGalleries(toGalleries(docs));
      })
      .catch((error: unknown) => {
        // Keep the placeholder pictures, and say why once.
        console.warn("[ZeroTheory] Could not load Archive photos from Sanity.", error);
      });

    return () => {
      cancelled = true;
    };
  }, [key]);

  return galleries;
}
