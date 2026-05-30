/**
 * Resolve an image attribute object to a renderable URL.
 *
 * Accepts shapes:
 *   { url: "https://..." }      -> returned as-is
 *   { url: "/img/foo.jpg" }     -> returned as-is (served from /public)
 *   undefined / null            -> fallback to /missing.jpg
 *
 * @param {{ url?: string } | null | undefined} image
 * @returns {string}
 */
export const fromImageToUrl = (image) => {
  if (!image || !image.url) {
    return "/missing.jpg";
  }
  return image.url;
};
