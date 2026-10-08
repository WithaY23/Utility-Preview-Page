import type { Preview } from '../types/preview'
import { PreviewCard } from './PreviewCard'
// import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
type PreviewGridProps = {
  previews: Preview[]
  tagId: string
  showCreateButton?: boolean
}

export function PreviewGrid({ previews, tagId, showCreateButton = false }: PreviewGridProps) {

  return (
    <ul className="preview-grid">
      {previews.map((preview) => (
        <li key={preview.id} className="preview-grid__item">
          <PreviewCard preview={preview} />
        </li>
      ))}
      {showCreateButton ? (
        <li className="preview-grid__item">
          <Link
            to={`/tags/${tagId}/create-preview`}
            className="preview-grid__create"
            aria-label="Create a new preview"
            >
            <span className="preview-grid__plus" aria-hidden="true" />
            </Link>
        </li>
      ) : null}
    </ul>
  )
}
