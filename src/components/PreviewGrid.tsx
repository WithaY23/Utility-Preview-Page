import type { Preview } from '../types/preview'
import { PreviewCard } from './PreviewCard'

type PreviewGridProps = {
  previews: Preview[]
}

export function PreviewGrid({ previews }: PreviewGridProps) {
  return (
    <ul className="preview-grid">
      {previews.map((preview) => (
        <li key={preview.id} className="preview-grid__item">
          <PreviewCard preview={preview} />
        </li>
      ))}
    </ul>
  )
}
