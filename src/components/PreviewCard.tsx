import type { CSSProperties } from 'react'
import type { Preview } from '../types/preview'

type PreviewCardProps = {
  preview: Preview
}

export function PreviewCard({ preview }: PreviewCardProps) {
  const shellStyle: CSSProperties = {
    backgroundColor: preview.backgroundType == 'color' ? preview.backgroundColor : '',
  }
  const descrBG: CSSProperties = {
    backgroundColor: preview.descriptionBgColor ? preview.descriptionBgColor : '',
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
      {preview.backgroundType == 'image' ? (
        <img
          className="preview__image"
          src={preview.backgroundImage}
          alt=""
          decoding="async"
          loading="lazy"
        />
      ) : null}

      <span className="preview__title">{preview.title}</span>
      <div className="preview__desc" style={descrBG}>
        <p className="preview__desc-text">{preview.description}</p>
      </div>
    </a>
  )
}
