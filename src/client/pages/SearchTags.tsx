import { useEffect, useState } from 'react'
// import type { Dispatch, SetStateAction } from 'react'
import { PreviewGrid } from '../components/PreviewGrid'
import type { Tag } from '../types/tag'
import NavBar from './NavBar'
import '../styles/SearchTags.css'
import { tagAnchorId } from '../util'
type SearchTagsProps = {
  tags: Tag[]
}


function SearchTags({ tags }: SearchTagsProps) {
  const [expandedTagSlug, setExpandedTagSlug] = useState<string | undefined>(undefined)

  useEffect(() => {
    // if (tags.length === 0) {
    //   setExpandedTagSlug(undefined)
    //   return
    // }

    const hash = window.location.hash.slice(1)
    
    if (hash) {
      const matchingTagIndex = tags.findIndex((tag) => tagAnchorId(tag.name) === hash)
      const matchingTag = matchingTagIndex !== -1 ? tags[matchingTagIndex] : null;

      if (matchingTag) {
        requestAnimationFrame(() => {
          setExpandedTagSlug(tagAnchorId(matchingTag.name))
          document.getElementById(String(matchingTagIndex))?.scrollIntoView({ block: 'start' })
        })
      }
    } else {
      requestAnimationFrame(() => {
          setExpandedTagSlug(tagAnchorId(tags[0].name))
          document.getElementById(String(0))?.scrollIntoView({ block: 'start' })
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
            const sectionId = tagAnchorId(tag.name)
            const isExpanded = sectionId === expandedTagSlug

            return (
              <section key={tag.name} id={String(tagIndex)} className="search-tags__section">
                <button
                  type="button"
                  className="search-tags__heading"
                  aria-expanded={isExpanded}
                  onClick={() => {
                    setExpandedTagSlug(isExpanded ? undefined : sectionId)
                    window.history.replaceState(null, '', `/view#${sectionId}`)
                  }}
                >
                  <span>{tag.name}</span>
                  <span className={`search-tags__chevron${isExpanded ? ' search-tags__chevron--open' : ''}`} aria-hidden="true" />
                </button>
                {isExpanded ? (
                  <PreviewGrid previews={tag.previews} tagId={tag.id} showCreateButton />
                ) : null}
              </section>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default SearchTags