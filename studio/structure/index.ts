import { ImagesIcon } from "@sanity/icons/Images";
import type { StructureResolver } from "sanity/structure";
import { ARCHIVE_CARDS } from "../lib/archive-cards";

/**
 * The Archive cards are singletons: one document per card, with a fixed id.
 * Editors open a card and add photos; they cannot create a fifth card or
 * delete one (see document.actions in sanity.config.ts).
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("ZeroTheory")
    .items([
      S.listItem()
        .title("Archive cards")
        .icon(ImagesIcon)
        .child(
          S.list()
            .title("Archive cards")
            .items(
              ARCHIVE_CARDS.map((card) =>
                S.listItem()
                  .id(card.id)
                  .title(card.title)
                  .icon(ImagesIcon)
                  .child(
                    S.document()
                      .schemaType("archiveCard")
                      .documentId(card.id)
                      .title(card.title)
                  )
              )
            )
        ),
      S.divider(),
      // Anything added to the schema later shows up here, minus the singleton type.
      ...S.documentTypeListItems().filter((item) => item.getId() !== "archiveCard"),
    ]);
