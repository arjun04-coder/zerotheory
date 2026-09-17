/**
 * The Archive section on the website has exactly four cards.
 * Each card is one Sanity document with a fixed id, so editors can only
 * add photos to an existing card - never create or delete a card.
 * The ids below must match `archiveItems[].docId` in
 * client/src/data/zeroTheory.ts.
 */
export const ARCHIVE_CARDS = [
  { id: "archive-starting-point", title: "The starting point", position: "Archive / 01" },
  { id: "archive-make-it-real", title: "Make it real", position: "Archive / 02" },
  { id: "archive-build-together", title: "Build together", position: "Archive / 03" },
  { id: "archive-next-up", title: "Next up: 2.0", position: "Archive / 04" },
] as const;

export const ARCHIVE_CARD_IDS = ARCHIVE_CARDS.map((card) => card.id);

export function archiveCardTitle(id?: string): string {
  return ARCHIVE_CARDS.find((card) => card.id === id)?.title ?? "Archive card";
}
