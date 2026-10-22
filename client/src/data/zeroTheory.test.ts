import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { archiveItems } from "./zeroTheory";

const PUBLIC_DIR = join(import.meta.dirname, "..", "..", "public");

/** Every "/images/x.jpg" in the data must be a file that actually ships. */
function fileFor(src: string) {
  return join(PUBLIC_DIR, src.replace(/^\//, ""));
}

describe("archive cards", () => {
  it("has four cards with unique titles", () => {
    expect(archiveItems).toHaveLength(4);
    expect(new Set(archiveItems.map((item) => item.title)).size).toBe(4);
  });

  it("points every card picture at a file that exists", () => {
    for (const item of archiveItems) {
      expect(existsSync(fileFor(item.image)), `${item.title}: ${item.image}`).toBe(true);
    }
  });

  it("points every gallery photo at a file that exists", () => {
    for (const item of archiveItems) {
      for (const photo of item.gallery) {
        expect(existsSync(fileFor(photo.src)), `${item.title}: ${photo.src}`).toBe(true);
      }
    }
  });

  it("gives every gallery photo alt text", () => {
    for (const item of archiveItems) {
      for (const photo of item.gallery) {
        expect(photo.alt.trim().length, `${item.title}: ${photo.src}`).toBeGreaterThan(0);
      }
    }
  });

  it("never repeats a photo inside one gallery", () => {
    for (const item of archiveItems) {
      const sources = item.gallery.map((photo) => photo.src);
      expect(new Set(sources).size, item.title).toBe(sources.length);
    }
  });
});
