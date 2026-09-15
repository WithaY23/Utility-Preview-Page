import { useEffect, useRef, useState } from 'react'
import { LOCAL_APP_OPTIONS } from '../data/preview'
import type { DistributiveOmit, Preview } from '../types/preview'
import LocalAppClickable from './LocalAppClickable'

type PreviewDraft = DistributiveOmit<Preview, 'id'>

type LocalAppModalProps = {
  isOpen: boolean
  onClose: () => void
  onDraftChange: (updates: Partial<PreviewDraft>) => void
}

function LocalAppModal({ isOpen, onClose, onDraftChange }: LocalAppModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const [appURI, setAppURI] = useState('')

  const handleConfirm = () => {
    if (!appURI) {
      return
    }

    onDraftChange({ href: appURI })
    setAppURI('')
    onClose()
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setAppURI('')
        onClose()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusableElements = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, input:not([disabled])',
      )

      if (!focusableElements?.length) {
        return
      }

      event.preventDefault()
      const currentIndex = Array.from(focusableElements).indexOf(
        document.activeElement as HTMLElement,
      )
      const nextIndex = event.shiftKey
        ? (currentIndex - 1 + focusableElements.length) % focusableElements.length
        : (currentIndex + 1) % focusableElements.length

      focusableElements[nextIndex]?.focus()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className="local-app-modal">
      <section
        ref={panelRef}
        className="local-app-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="local-app-modal-heading"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="local-app-modal__close"
          aria-label="Close local app selector"
          onClick={() => {
            setAppURI('')
            onClose()
          }}
        >
          <span aria-hidden="true">×</span>
        </button>
        <h2 id="local-app-modal-heading">Select a Local App:</h2>
        <div className="local-app-modal__content">
          <label className="local-app-modal__label" htmlFor="local-app-name">
            Enter App Name:
          </label>
          <input
            id="local-app-name"
            className="local-app-modal__input"
            type="text"
            placeholder="Discord, Spotify, Notion"
            readOnly
          />
          <div className="local-app-modal__options">
            {LOCAL_APP_OPTIONS.map((app) => (
              <LocalAppClickable key={app.name} app={app} onSelect={setAppURI} />
            ))}
          </div>
          <label className="local-app-modal__label" htmlFor="local-app-uri">
            App URI:
          </label>
          <input
            id="local-app-uri"
            className="local-app-modal__input"
            type="text"
            value={appURI}
            placeholder="app://"
            readOnly
          />
        </div>
        <button
          type="button"
          className="local-app-modal__confirm"
          disabled={!appURI}
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </section>
    </div>
  )
}

export default LocalAppModal
