import { ImagesIcon } from "@sanity/icons/Images";
import { defineArrayMember, defineField, defineType } from "sanity";
import { archiveCardTitle } from "../../lib/archive-cards";

type GalleryItem = { isCover?: boolean };

export const archiveCard = defineType({
  name: "archiveCard",
  title: "Archive card",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "gallery",
      title: "Photos",
      type: "array",
      description:
        "Photos shown when a visitor opens this card on the website. Leave empty to keep the card exactly as it is today.",
      of: [defineArrayMember({ type: "galleryImage" })],
      options: { layout: "grid" },
      validation: (rule) =>
        rule.custom((gallery) => {
          const items = (gallery as GalleryItem[] | undefined) ?? [];
          const covers = items.filter((item) => item?.isCover);
          if (covers.length > 1) {
            return "Only one photo can be the card cover. Untick the others.";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: { id: "_id", gallery: "gallery" },
    prepare({ id, gallery }) {
      const items = (gallery as { isCover?: boolean }[] | undefined) ?? [];
      const cover = items.find((item) => item?.isCover);
      const count = items.length;
      return {
        title: archiveCardTitle(typeof id === "string" ? id.replace(/^drafts\./, "") : undefined),
        subtitle:
          count === 0
            ? "No photos yet - placeholder picture in use"
            : `${count} photo${count === 1 ? "" : "s"}${cover ? "" : " - no cover ticked, placeholder still in use"}`,
      };
    },
  },
});
