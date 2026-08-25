import { useState } from 'react'
import {
  HOME_MAX_PREVIEW_PAGES,
  HOME_PREVIEWS_PER_PAGE,
} from '../data/tags'
import type { Tag } from '../types/tag'
import { PreviewGrid } from './PreviewGrid'
import { useNavigate } from 'react-router-dom'
type TagSectionProps = {
  tag: Tag
}

export function TagSection({ tag }: TagSectionProps) {
  const [page, setPage] = useState(0)
  const headingId = `${tag.id}-heading`
  const navigate = useNavigate()

  
  const cappedPreviews = tag.previews.slice(
    0,
    HOME_PREVIEWS_PER_PAGE * HOME_MAX_PREVIEW_PAGES,
  )
  const currentPageCount = Math.ceil(cappedPreviews.length / HOME_PREVIEWS_PER_PAGE) // int: [0, H_M_P_P]
  const visiblePreviews = cappedPreviews.slice(
    page * HOME_PREVIEWS_PER_PAGE,
    page * HOME_PREVIEWS_PER_PAGE + HOME_PREVIEWS_PER_PAGE,
  )
  const hasNextPage = page + 1 < currentPageCount
  const seeCompleteTag = tag.previews.length > HOME_PREVIEWS_PER_PAGE *HOME_MAX_PREVIEW_PAGES
  return (
    <section className="tag-section" aria-labelledby={headingId}>
      <h2 id={headingId}>{tag.name}</h2>
      <div className="tag-section__row">
        <PreviewGrid previews={visiblePreviews} />
        {hasNextPage ? (
          <button
            type="button"
            className="tag-section__arrow"
            aria-label={`Next previews in ${tag.name}`}
            onClick={() => setPage((current) => current + 1)}
          >
            <span className="tag-section__chevron" aria-hidden="true" />
          </button>
        ) : seeCompleteTag ? (
          <button
            type="button"
            className="tag-section__see-all"
            aria-label={`See all previews in ${tag.name}`}
            onClick={() => {console.log(`Clicked See All Previews Home Page ${tag.name}`); navigate(`/view/${tag.name}`)}} // Pass your navigation/expand handler here
          >
            <span>See All Previews</span>

          </button>
        ) : null}
      </div>
    </section>
  )
}
