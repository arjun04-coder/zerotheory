export interface SanityImageRef {
  _type?: "image";
  asset?: { _ref?: string; _type?: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface GalleryPhoto {
  _key: string;
  alt?: string;
  caption?: string;
  isCover?: boolean;
  image?: SanityImageRef;
  /** Tiny blurred preview, used while the full photo loads. */
  lqip?: string;
  aspectRatio?: number;
}

export interface ArchiveCardDocument {
  _id: string;
  gallery?: GalleryPhoto[];
}

/** Card id -> its published photos, in the order the editor arranged them. */
export type ArchiveGalleries = Record<string, GalleryPhoto[]>;
