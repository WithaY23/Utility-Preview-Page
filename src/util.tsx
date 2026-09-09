
// Find css id's in this format Lowercase slug
export function tagAnchorId(name: string) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
}