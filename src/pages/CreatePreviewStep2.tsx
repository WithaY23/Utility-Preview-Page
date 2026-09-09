import type { Preview } from '../types/preview'
import { PreviewDisplay } from '../components/PreviewDisplay'
import { BackgroundImageGallery } from '../components/BackgroundImageGallery'
import { DescriptionSection } from '../components/DescriptionSection'
import '../styles/CreatePreviewPage.css'

type PreviewDraft = Omit<Preview, 'id'>

type CreatePreviewStep2Props = PreviewDraft & {
  onBack: () => void
  onSave: () => void
  onDraftChange: (updates: Partial<PreviewDraft>) => void
}

function CreatePreviewStep2({
  title,
  description,
  backgroundImage,
  backgroundColor,
  descriptionBgColor,
  onBack,
  onSave,
  onDraftChange,
}: CreatePreviewStep2Props) {
  const previewData: Omit<Preview, 'id'> = {
    title,
    description,
    href: '',
    backgroundImage,
    backgroundColor,
    descriptionBgColor,
  }

  const handleImageSelect = (imagePath: string) => {
    onDraftChange({
      backgroundImage: imagePath,
      backgroundColor: '',
    })
  }

  const handleColorModeToggle = (useColor: boolean) => {
    if (useColor) {
      onDraftChange({
        backgroundImage: '',
        backgroundColor: '#6C757D'
      })
    }
    else{
      onDraftChange({
        // backgroundColor: '#6C757D',
        backgroundImage: '1'
      })
    }
  }

  const handleColorChange = (color: string) => {
    onDraftChange({
      backgroundColor: color,
    })
  }

  const handleDescriptionChange = (text: string) => {
    onDraftChange({
      description: text,
    })
  }

  const handleDescriptionBgColorChange = (color: string) => {
    onDraftChange({
      descriptionBgColor: color,
    })
  }

  return (
    <section
      className="create-preview-step-2"
      aria-labelledby="create-preview-step-2-heading"
    >
      <h1 id="create-preview-step-2-heading">Finalize your Preview!</h1>

      <div className="create-preview-step-2__content">
        <div className="create-preview-step-2__preview">
          <PreviewDisplay preview={previewData} />
        </div>

        <div className="create-preview-step-2__gallery">
          <BackgroundImageGallery
            selectedImage={backgroundImage || null}
            useColorBackground={!!backgroundColor && !backgroundImage}
            backgroundColor={backgroundColor || '#6C757D'}
            onImageSelect={handleImageSelect}
            onColorModeToggle={handleColorModeToggle}
            onColorChange={handleColorChange}
          />
        </div>

        <div className="create-preview-step-2__description">
          <DescriptionSection
            description={description}
            descriptionBgColor={descriptionBgColor || '#6C757D'}
            onDescriptionChange={handleDescriptionChange}
            onDescriptionBgColorChange={handleDescriptionBgColorChange}
          />
        </div>
      </div>

      <div className="create-preview-step-2__actions">
        <button type="button" className="create-preview-step-2__button" onClick={onBack}>
          Back
        </button>
        <button type="button" className="create-preview-step-2__button" onClick={onSave}>
          Save Preview
        </button>
      </div>
    </section>
  )
}

export default CreatePreviewStep2
