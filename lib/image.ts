export function normalizeImageUrl(url?: string) {
  if (!url) return undefined;
  const match = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([^/?]+)/);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
}
