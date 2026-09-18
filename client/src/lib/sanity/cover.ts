import type { ArchiveCardDocument, ArchiveGalleries, GalleryPhoto } from "./types";

const hasAsset = (photo: GalleryPhoto) => Boolean(photo?.image?.asset?._ref);

/** Photos that can actually be displayed, in editor order. */
export function usablePhotos(gallery?: GalleryPhoto[]): GalleryPhoto[] {
  return (gallery ?? []).filter(hasAsset);
}

/**
 * The card cover, or null to keep the picture that ships with the site.
 *
 * A cover is only used when an editor ticked "Use as card cover". If several
 * are ticked (the Studio blocks publishing that, but be safe), the first one
 * in the editor's order wins.
 */
export function pickCover(gallery?: GalleryPhoto[]): GalleryPhoto | null {
  return usablePhotos(gallery).find((photo) => photo.isCover === true) ?? null;
}

export function toGalleries(docs: ArchiveCardDocument[] | null | undefined): ArchiveGalleries {
  const galleries: ArchiveGalleries = {};
  for (const doc of docs ?? []) {
    if (!doc?._id) continue;
    galleries[doc._id.replace(/^drafts\./, "")] = usablePhotos(doc.gallery);
  }
  return galleries;
}
