import type { CSSProperties } from 'react'
import type { DistributiveOmit, Preview } from '../types/preview'

type PreviewDisplayProps = {
  preview: DistributiveOmit<Preview, 'id'>
}

export function CreatePreviewDisplay({ preview }: PreviewDisplayProps) {
  const shellStyle: CSSProperties = {
    backgroundColor:  preview.backgroundType == 'color' ? (preview.backgroundColor) : '',
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
        {preview.backgroundType == 'image' ? (
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
