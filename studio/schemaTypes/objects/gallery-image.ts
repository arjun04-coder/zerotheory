import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Photo",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required().error("Pick an image."),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description:
        "What the photo shows, in a few words. Read aloud by screen readers and used by search engines.",
      validation: (rule) =>
        rule.required().error("Alt text is required.").max(125).warning("Keep it under 125 characters."),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional. Shown under the photo when the gallery is open.",
      validation: (rule) => rule.max(140).warning("Long captions get cut off on phones."),
    }),
    defineField({
      name: "isCover",
      title: "Use as card cover",
      type: "boolean",
      description:
        "Tick this on one photo to make it the picture on the card. Until a photo is ticked, the card keeps the placeholder picture that ships with the website.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { alt: "alt", caption: "caption", media: "image", isCover: "isCover" },
    prepare({ alt, caption, media, isCover }) {
      const notes = [isCover ? "Cover" : null, caption].filter(Boolean).join(" · ");
      return {
        title: alt || "Photo without alt text",
        subtitle: notes || undefined,
        media,
      };
    },
  },
});
