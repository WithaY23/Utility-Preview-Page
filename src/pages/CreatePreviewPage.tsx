import { useState } from 'react'
import NavBar from './NavBar'
import type { Preview } from '../types/preview'
import CreatePreviewStep1 from './CreatePreviewStep1'
import CreatePreviewStep2 from './CreatePreviewStep2'

type PreviewDraft = Omit<Preview, 'id'>

function CreatePreviewPage() {
  const [draft, setDraft] = useState<PreviewDraft>({
    title: '',
    description: '',
    href: '',
    backgroundImage: '',
    backgroundColor: '',
  })
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)

  const updateDraft = (updates: Partial<PreviewDraft>) => {
    setDraft((currentDraft) => ({ ...currentDraft, ...updates }))
  }

  return (
    <div className="create-preview-page">
      <NavBar />
      <main aria-labelledby={currentStep === 1 ? 'create-preview-heading' : 'create-preview-step-2-heading'}>
        {currentStep === 1 ? (
          <CreatePreviewStep1
            {...draft}
            onDraftChange={updateDraft}
            onNext={() => setCurrentStep(2)}
          />
        ) : (
          <CreatePreviewStep2
            {...draft}
            onBack={() => setCurrentStep(1)}
            onSave={() => undefined}
          />
        )}
      </main>
    </div>
  )
}

export default CreatePreviewPage
