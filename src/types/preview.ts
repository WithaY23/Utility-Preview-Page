export type Preview = {
  id: string
  title: string
  description: string
  href: string
  /** Optional site screenshot or art. Falls back to the gray shell. */
  backgroundImage?: string
  /** Optional shell tint. Falls back to Figma F1.1 (#6C757D). */
  backgroundColor?: string
}
