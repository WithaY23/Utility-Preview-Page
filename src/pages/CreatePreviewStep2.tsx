import type { Preview } from '../types/preview'

type PreviewDraft = Omit<Preview, 'id'>

type CreatePreviewStep2Props = PreviewDraft & {
  onBack: () => void
  onSave: () => void
}

function CreatePreviewStep2({ title, onBack, onSave }: CreatePreviewStep2Props) {
  return (
    <section className="create-preview-card" aria-labelledby="create-preview-step-2-heading">
      <h1 id="create-preview-step-2-heading">Finalize your Preview!</h1>
      <p>Preview setup for {title || 'your preview'} is coming next.</p>
      <div>
        <button type="button" onClick={onBack}>Back</button>
        <button type="button" onClick={onSave}>Save</button>
      </div>
    </section>
  )
}

export default CreatePreviewStep2
