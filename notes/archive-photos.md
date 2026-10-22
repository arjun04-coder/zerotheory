# Archive photos

The four Archive cards and their galleries are plain data in the website
code. There is no CMS: changing a photo means changing a file and a line.

## Changing or adding a photo

1. Put the image in `client/public/images/`. JPEG, no wider than about
   1600px, and under roughly 300 KB. Anything larger slows the page down for
   visitors on mobile data.
2. Open `client/src/data/zeroTheory.ts` and find `archiveItems`.
3. `image` is the picture on the card itself. `gallery` is the list that
   opens when a visitor clicks the card.
4. Every gallery photo needs `alt`: a short description of what the photo
   shows, read aloud by screen readers and used by search engines.
   `caption` is optional and appears under the photo.

```ts
{
  src: "/images/photo-lab-session.jpg",
  alt: "Students at workstations during a hands-on ZeroTheory lab session",
  caption: "A hands-on session, one workstation per student.",
}
```

An empty `gallery` means the card still shows its picture but does not open.

`client/src/data/zeroTheory.test.ts` checks that every file named here really
exists and that no photo is missing its alt text. Run `npx vitest run`.

## Which photo is where

| Card | Card picture | Gallery |
|---|---|---|
| The starting point | `archive-01-from-zero-talk.jpg` | the From Zero to Hero stage talk |
| Make it real | `photo-lab-session.jpg` | the lab session, the online session |
| Build together | `archive-03-school-session.jpg` | the school session, the questions |
| Next up: 2.0 | `photo-podcast.jpg` | the podcast interview |

The two `archive-*` files are crops of the same photographs, framed for the
card's shape. The `photo-*` files are the full images, used in the gallery.
When you replace a card picture, crop it to a landscape shape first: the card
fills its box, so a portrait photo loses its left and right edges.

## Consent

Two photos show identifiable school students, most of them minors, and one
shows 27 named participants of an online session. Get consent before putting
any further photos of students on a public page.

## History

The Archive galleries used to come from a Sanity CMS project (`sr3ug5gw`), so
that photos could be changed without touching code. That was removed on
22 Oct 2026 at Anupam's request and the photos were moved into the repository.
Nothing in the site reads Sanity any more. The Sanity project itself still
exists, unused, and can be deleted at sanity.io/manage.
