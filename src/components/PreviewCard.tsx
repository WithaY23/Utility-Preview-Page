import type { CSSProperties } from 'react'
import type { Preview } from '../types/preview'

type PreviewCardProps = {
  preview: Preview
}

export function PreviewCard({ preview }: PreviewCardProps) {
  const shellStyle: CSSProperties = {
    backgroundColor: preview.backgroundColor,
  }

  return (
    <a
      className="preview"
      href={preview.href}
      rel="noopener noreferrer"
      target="_blank"
      style={shellStyle}
      aria-label={`${preview.title}: ${preview.description}`}
    >
      {preview.backgroundImage ? (
        <img
          className="preview__image"
          src={preview.backgroundImage}
          alt=""
          decoding="async"
          loading="lazy"
        />
      ) : null}

      <span className="preview__title">{preview.title}</span>
      <div className="preview__desc">
        <p className="preview__desc-text">{preview.description}</p>
      </div>
    </a>
  )
}
