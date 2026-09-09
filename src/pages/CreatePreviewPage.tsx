import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from './NavBar'
import type { Preview } from '../types/preview'
import type { Tag } from '../types/tag'
import { saveTagPreview } from '../data/tags'
import { tagAnchorId } from '../util'
import CreatePreviewStep1 from './CreatePreviewStep1'
import CreatePreviewStep2 from './CreatePreviewStep2'

type PreviewDraft = Omit<Preview, 'id'>

type CreatePreviewPageProps = {
  tags: Tag[]
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>
}

function CreatePreviewPage({ tags, setTags }: CreatePreviewPageProps) {
  const { tagId } = useParams<{ tagId: string }>()
  const navigate = useNavigate()
  const tag = tags.find((currentTag) => currentTag.id === tagId)
  const [draft, setDraft] = useState<PreviewDraft>({
    title: '',
    description: '',
    href: '',
    backgroundImage: '',
    backgroundColor: '',
    descriptionBgColor: '#6C757D',
  })
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)

  const updateDraft = (updates: Partial<PreviewDraft>) => {
    setDraft((currentDraft) => ({ ...currentDraft, ...updates }))
  }

  useEffect(() => {
    if (!tag) {
      console.error(`Cannot create preview: tag "${tagId ?? ''}" was not found.`)
      navigate('/view', { replace: true })
    }
  }, [navigate, tag, tagId])

  if (!tag) {
    return null
  }

  const savePreview = () => {
    setTags((currentTags) => saveTagPreview(currentTags, tag.id, draft))
    navigate(`/view#${tagAnchorId(tag.name)}`)
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
            onSave={savePreview}
            onDraftChange={updateDraft}
          />
        )}
      </main>
    </div>
  )
}

export default CreatePreviewPage
