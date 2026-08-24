import type { Preview } from '../types/preview'
import type { Tag } from '../types/tag'

export const HOME_MAX_TAGS = 3
export const HOME_PREVIEWS_PER_PAGE = 4
export const HOME_MAX_PREVIEW_PAGES = 2

let previewSeq = 0

function preview(
  fields: Omit<Preview, 'id'> & { id?: string },
): Preview {
  previewSeq += 1
  return {
    ...fields,
    id: fields.id ?? `preview-${previewSeq}`,
  }
}

const docsPreviews: Preview[] = [
  preview({
    title: 'MDN',
    description: 'Web docs and references for HTML, CSS, and JavaScript.',
    href: 'https://developer.mozilla.org/',
  }),
  preview({
    title: 'TypeScript',
    description: 'Typed JavaScript that scales with editor tooling.',
    href: 'https://www.typescriptlang.org/',
    backgroundColor: '#3178c6',
  }),
  preview({
    title: 'Can I Use',
    description: 'Browser support tables for web features.',
    href: 'https://caniuse.com/',
  }),
  preview({
    title: 'CSS Tricks',
    description: 'Practical CSS, HTML, and JS articles.',
    href: 'https://css-tricks.com/',
  }),
  preview({
    title: 'web.dev',
    description: 'Guidance for building modern, fast sites.',
    href: 'https://web.dev/',
  }),
  preview({
    title: 'MDN CSS',
    description: 'CSS property and selector reference.',
    href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  }),
  preview({
    title: 'A11y',
    description: 'Web accessibility initiative resources.',
    href: 'https://www.w3.org/WAI/',
  }),
  preview({
    title: 'HTTP',
    description: 'MDN HTTP protocol documentation.',
    href: 'https://developer.mozilla.org/en-US/docs/Web/HTTP',
  }),
  preview({
    title: 'SVG',
    description: 'Scalable vector graphics on the web.',
    href: 'https://developer.mozilla.org/en-US/docs/Web/SVG',
  }),
]

const toolsPreviews: Preview[] = [
  preview({
    title: 'React',
    description: 'Library for building user interfaces from components.',
    href: 'https://react.dev/',
    backgroundColor: '#23272f',
  }),
  preview({
    title: 'Vite',
    description: 'Next-generation frontend tooling and fast local server.',
    href: 'https://vite.dev/',
    backgroundColor: '#646cff',
  }),
  preview({
    title: 'Tailwind',
    description: 'Utility-first CSS framework for rapid UI work.',
    href: 'https://tailwindcss.com/',
    backgroundColor: '#0f172a',
  }),
  preview({
    title: 'Figma',
    description: 'Collaborative design tool for UI, prototypes, and systems.',
    href: 'https://www.figma.com/',
    backgroundColor: '#1e1e1e',
  }),
  preview({
    title: 'GitHub',
    description: 'Host and review git repositories.',
    href: 'https://github.com/',
  }),
  preview({
    title: 'Node.js',
    description: 'JavaScript runtime for servers and tools.',
    href: 'https://nodejs.org/',
  }),
  preview({
    title: 'npm',
    description: 'Package registry for the JavaScript ecosystem.',
    href: 'https://www.npmjs.com/',
  }),
  preview({
    title: 'React Compiler',
    description: 'Automatic memoization for React components.',
    href: 'https://react.dev/learn/react-compiler',
    backgroundColor: '#23272f',
  }),
]

export const TAGS: Tag[] = [
  {
    id: 'tag-tools',
    name: 'Tools',
    previews: toolsPreviews,
  },
  {
    id: 'tag-docs',
    name: 'Docs',
    previews: docsPreviews,
  },
  {
    id: 'tag-docs2',
    name: 'Docs2',
    previews: docsPreviews
  }
]

export function tagsForHome(tags: Tag[]): Tag[] {
  // TODO: popular/recent tags (cache / user data) — not implemented; alphabetical order is the base design.
  return [...tags]
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, HOME_MAX_TAGS)
}

export function shouldShowSeeAllTags(totalTagCount: number): boolean {
  return totalTagCount >= HOME_MAX_TAGS
}
