import { describe, expect, it } from "vitest";
import { pickCover, toGalleries, usablePhotos } from "./cover";
import type { GalleryPhoto } from "./types";

const photo = (key: string, extra: Partial<GalleryPhoto> = {}): GalleryPhoto => ({
  _key: key,
  alt: `photo ${key}`,
  image: { _type: "image", asset: { _ref: `image-${key}-1200x800-jpg` } },
  ...extra,
});

describe("pickCover", () => {
  it("keeps the placeholder when there are no photos", () => {
    expect(pickCover(undefined)).toBeNull();
    expect(pickCover([])).toBeNull();
  });

  it("keeps the placeholder when no photo is ticked as cover", () => {
    expect(pickCover([photo("a"), photo("b")])).toBeNull();
  });

  it("uses the ticked photo as the cover", () => {
    const cover = photo("b", { isCover: true });
    expect(pickCover([photo("a"), cover, photo("c")])?._key).toBe("b");
  });

  it("uses the first ticked photo if several are ticked", () => {
    const photos = [photo("a"), photo("b", { isCover: true }), photo("c", { isCover: true })];
    expect(pickCover(photos)?._key).toBe("b");
  });

  it("ignores photos whose image was never uploaded", () => {
    const broken: GalleryPhoto = { _key: "x", isCover: true, image: { _type: "image" } };
    expect(pickCover([broken, photo("b", { isCover: true })])?._key).toBe("b");
    expect(usablePhotos([broken, photo("b")])).toHaveLength(1);
  });
});

describe("toGalleries", () => {
  it("maps documents by id and drops unusable photos", () => {
    const galleries = toGalleries([
      { _id: "archive-starting-point", gallery: [photo("a"), { _key: "b" }] },
      { _id: "drafts.archive-make-it-real", gallery: [photo("c")] },
    ]);
    expect(Object.keys(galleries)).toEqual(["archive-starting-point", "archive-make-it-real"]);
    expect(galleries["archive-starting-point"]).toHaveLength(1);
  });

  it("survives an empty or failed response", () => {
    expect(toGalleries(null)).toEqual({});
    expect(toGalleries([])).toEqual({});
  });
});
