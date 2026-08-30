import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { PreviewGrid } from '../components/PreviewGrid'
import type { Tag } from '../types/tag'
import NavBar from './NavBar'
import '../styles/SearchTags.css'

type SearchTagsProps = {
  tags: Tag[]
  setTags: Dispatch<SetStateAction<Tag[]>>
}

// Find css id's in this format Lowercase slug
function tagAnchorId(name: string) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function SearchTags({ tags }: SearchTagsProps) {
  const [expandedTagId, setExpandedTagId] = useState<string | undefined>(tags[0]?.id)

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    const matchingTagIndex = tags.findIndex((tag) => tagAnchorId(tag.name) === hash)
    const matchingTag = matchingTagIndex !== -1 ? tags[matchingTagIndex] : null;

    if (matchingTag) {
      requestAnimationFrame(() => {
        setExpandedTagId(matchingTag.id)
        document.getElementById(String(matchingTagIndex))?.scrollIntoView({ block: 'start' })
      })
    }
  }, [tags])

  return (
    <div className="search-tags">
      <NavBar />
      <main className="search-tags__content" aria-labelledby="search-tags-title">
        <h1 id="search-tags-title">Search Tags</h1>
        <div className="search-tags__list">
          {tags.map((tag, tagIndex) => {
            const isExpanded = tag.id === expandedTagId
            const sectionId = tagAnchorId(tag.name)

            return (
              <section key={tag.id} id={String(tagIndex)} className="search-tags__section">
                <button
                  type="button"
                  className="search-tags__heading"
                  aria-expanded={isExpanded}
                  onClick={() => {
                    setExpandedTagId(isExpanded ? undefined : tag.id)
                    window.history.replaceState(null, '', `/view#${sectionId}`)
                  }}
                >
                  <span>{tag.name}</span>
                  <span className={`search-tags__chevron${isExpanded ? ' search-tags__chevron--open' : ''}`} aria-hidden="true" />
                </button>
                {isExpanded ? <PreviewGrid previews={tag.previews} showCreateButton /> : null}
              </section>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default SearchTags