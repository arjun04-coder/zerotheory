import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "qkmsxhv6";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "zerotheory",
  title: "ZeroTheory",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: "2026-09-17" })],
  schema: { types: schemaTypes },
  document: {
    // Archive cards are fixed: no creating, duplicating or deleting them.
    actions: (prev, { schemaType }) =>
      schemaType === "archiveCard"
        ? prev.filter((action) => !["duplicate", "delete", "unpublish"].includes(action.action ?? ""))
        : prev,
    newDocumentOptions: (prev) => prev.filter((template) => template.templateId !== "archiveCard"),
  },
});
