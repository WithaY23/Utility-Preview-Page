import type { FormEvent } from 'react'
import type { Preview } from '../types/preview'
import '../styles/CreatePreviewPage.css'
import type { DistributiveOmit } from '../types/preview'
type PreviewDraft = DistributiveOmit<Preview, 'id'>

type CreatePreviewStep1Props = PreviewDraft & {
  onDraftChange: (updates: Partial<PreviewDraft>) => void
  onNext: () => void
}

export default function CreatePreviewStep1({ title, href, onDraftChange, onNext }: CreatePreviewStep1Props) {
  const handleNext = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onNext()
  }

  return (
    <section className="create-preview-card">
      <h1 id="create-preview-heading">Add a Preview!</h1>

      <form className="create-preview-form" onSubmit={handleNext}>
        <label className="create-preview-form__label" htmlFor="preview-name">
          Preview Name:
        </label>
        <input
          id="preview-name"
          className="create-preview-form__input"
          type="text"
          name="previewName"
          value={title}
          onChange={(event) => onDraftChange({ title: event.target.value })}
          placeholder="Example: My Portfolio"
        />

        <label className="create-preview-form__label" htmlFor="preview-url">
          URL:
        </label>
        <input
          id="preview-url"
          className="create-preview-form__input"
          type="url"
          name="previewUrl"
          value={href}
          onChange={(event) => onDraftChange({ href: event.target.value })}
          placeholder="https://example.com"
        />

        <button type="submit" className="create-preview-form__button">
          Next
        </button>
      </form>
    </section>
  )
}


