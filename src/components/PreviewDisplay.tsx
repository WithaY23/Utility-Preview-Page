import type { CSSProperties } from 'react'
import type { Preview } from '../types/preview'

type PreviewDisplayProps = {
  preview: Omit<Preview, 'id'>
}

export function PreviewDisplay({ preview }: PreviewDisplayProps) {
  const shellStyle: CSSProperties = {
    backgroundColor: preview.backgroundColor,
  }

  const descStyle: CSSProperties = {
    backgroundColor: preview.descriptionBgColor || '#6C757D',
  }

  return (
    <div className="preview-display">
      <div
        className="preview-display__card"
        style={shellStyle}
      >
        {preview.backgroundImage ? (
          <img
            className="preview-display__image"
            src={preview.backgroundImage}
            alt=""
            decoding="async"
          />
        ) : null}

        <span className="preview-display__title">{preview.title || 'Preview Title'}</span>
        <div className="preview-display__desc" style={descStyle}>
          <p className="preview-display__desc-text">
            {preview.description || 'Preview description will appear here'}
          </p>
        </div>
      </div>
    </div>
  )
}
