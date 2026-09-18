import { createImageUrlBuilder } from "@sanity/image-url";
import { SANITY_DATASET, SANITY_PROJECT_ID } from "./env";
import type { SanityImageRef } from "./types";

const builder = createImageUrlBuilder({ projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET });

/** A cropped cover image at a fixed width, honouring the editor's hotspot. */
export function coverUrl(image: SanityImageRef, width: number, height: number): string {
  return builder.image(image).width(width).height(height).fit("crop").auto("format").quality(78).url();
}

export function coverSrcSet(image: SanityImageRef, widths: number[], ratio: number): string {
  return widths
    .map((width) => `${coverUrl(image, width, Math.round(width / ratio))} ${width}w`)
    .join(", ");
}

/** The whole photo, uncropped, for the gallery. */
export function fullUrl(image: SanityImageRef, width: number): string {
  return builder.image(image).width(width).fit("max").auto("format").quality(80).url();
}

export function fullSrcSet(image: SanityImageRef, widths: number[]): string {
  return widths.map((width) => `${fullUrl(image, width)} ${width}w`).join(", ");
}
