/**
 * Photos for the Archive cards. Only published documents are returned
 * (the client uses the "published" perspective), so drafts never reach the site.
 */
export const ARCHIVE_GALLERIES_QUERY = `*[_type == "archiveCard" && !(_id in path("drafts.**")) && _id in $ids]{
  _id,
  "gallery": coalesce(gallery, [])[defined(image.asset)]{
    _key,
    alt,
    caption,
    isCover,
    image,
    "lqip": image.asset->metadata.lqip,
    "aspectRatio": image.asset->metadata.dimensions.aspectRatio
  }
}`;
