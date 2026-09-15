import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { Preview } from '../types/preview'
import '../styles/CreatePreviewPage.css'
import type { DistributiveOmit } from '../types/preview'
import LocalAppModal from '../components/LocalAppModal'
type PreviewDraft = DistributiveOmit<Preview, 'id'>
import { LOCAL_APP_OPTIONS, LOCAL_APPS_CACHE_AMOUNT } from '../data/preview'



type CreatePreviewStep1Props = PreviewDraft & {
  onDraftChange: (updates: Partial<PreviewDraft>) => void
  onNext: () => void
}

export default function CreatePreviewStep1({ title, href, onDraftChange, onNext }: CreatePreviewStep1Props) {
  const [isLocalAppModalOpen, setIsLocalAppModalOpen] = useState(false)
  const localAppTriggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isLocalAppModalOpen) {
      localAppTriggerRef.current?.focus()
    }
  }, [isLocalAppModalOpen])

  const handleNext = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onNext()
  }

  return (
    <>
      <section className="create-preview-card">
        <h1 id="create-preview-heading">Add a Preview!</h1>

        <form className="create-preview-form" onSubmit={handleNext}>
        <div className="create-preview-form__name">
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
        </div>

        <div className="create-preview-form__sources">
          <div className="create-preview-form__source create-preview-form__source--web">
            <label className="create-preview-form__label" htmlFor="preview-url">
              Web App URL:
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
          </div>

          <span className="create-preview-form__or" aria-hidden="true">
            OR
          </span>

          <div className="create-preview-form__source create-preview-form__source--local">
            <span className="create-preview-form__label">Local App:</span>
            <div className="create-preview-form__local-controls">
              <div className="create-preview-form__app-options" aria-label="Available local apps">
                {LOCAL_APP_OPTIONS.map((app, index) => (index < LOCAL_APPS_CACHE_AMOUNT ?
                  <button
                    key={app.name}
                    type="button"
                    className="create-preview-form__app-button"
                    aria-label={`Select ${app.name}`}
                    onClick={() => onDraftChange({href: app.urlScheme})}
                  >
                    <img className="create-preview-form__app-image" src={app.imageURL} alt="" />
                  </button>
                  :
                  null
                ))}
              </div>
              <button
                type="button"
                className="create-preview-form__search-apps"
                ref={localAppTriggerRef}
                onClick={() => setIsLocalAppModalOpen(true)}
              >
                Search Local Apps
              </button>
            </div>
          </div>
        </div>

        <button type="submit" className="create-preview-form__button">
          Next
        </button>
        </form>
      </section>

      <LocalAppModal
        isOpen={isLocalAppModalOpen}
        onClose={() => setIsLocalAppModalOpen(false)}
        onDraftChange={onDraftChange}
      />
    </>
  )
}


