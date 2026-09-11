import type { BackgroundConfig, DistributiveOmit, Preview } from '../types/preview'
import { CreatePreviewDisplay } from '../components/CreatePreviewDisplay'
import { BackgroundImageGallery } from '../components/BackgroundImageGallery'
import { DescriptionSection } from '../components/DescriptionSection'
import '../styles/CreatePreviewPage.css'
// import type { PreviewOptions } from 'vite'

type PreviewDraft = DistributiveOmit<Preview, 'id'>

type CreatePreviewStep2Props = PreviewDraft & {
  onBack: () => void
  onSave: () => void
  onDraftChange: (updates: Partial<PreviewDraft>) => void
}

function CreatePreviewStep2(props: CreatePreviewStep2Props) {
  const { onBack, onSave, onDraftChange, ...draftProps } = props
  const previewData: PreviewDraft = {
    ...draftProps,
  }

  const handleImageSelect = (imagePath: string) => {
    onDraftChange({
    backgroundType: 'image',
    backgroundImage: imagePath,
  } as Preview)
  }


  const handleColorModeToggle = (useColor: boolean) => {
    if (useColor) {
      onDraftChange({
    backgroundType: 'color',
    backgroundColor: '#6C757D'
  } as Preview)
    }
    else{
      onDraftChange({
        // backgroundColor: '#6C757D',
        backgroundType: 'image',
        backgroundImage: '1'
      }as Preview)
    }
  }

  const handleColorChange = (color: string) => {
    onDraftChange({
      backgroundType: 'color',
      backgroundColor: color
    } as Preview)
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
  const getBackgroundConfig = (draft: PreviewDraft): BackgroundConfig => {
  switch (draft.backgroundType) {
    case 'image':
      return {
        backgroundType: 'image',
        backgroundImage: draft.backgroundImage,
      }
    case 'color':
      return {
        backgroundType: 'color',
        backgroundColor: draft.backgroundColor,
      }
    case 'default':
    default:
      return {
        backgroundType: 'default',
      }
  }
}
  return (
    <section
      className="create-preview-step-2"
      aria-labelledby="create-preview-step-2-heading"
    >
      <h1 id="create-preview-step-2-heading">Finalize your Preview!</h1>

      <div className="create-preview-step-2__content">
        <div className="create-preview-step-2__preview">
          <CreatePreviewDisplay preview={previewData} />
        </div>

        <div className="create-preview-step-2__gallery">
          <BackgroundImageGallery
            // selectedImage={backgroundType == 'image' ? {backgroundImage} as Preview : null}
            // useColorBackground={!!backgroundColor && !backgroundImage}
            // backgroundColor={backgroundColor || '#6C757D'}
            backgroundConf = {getBackgroundConfig(draftProps)}
            onImageSelect={handleImageSelect}
            onColorModeToggle={handleColorModeToggle}
            onColorChange={handleColorChange}
            
          />
        </div>

        <div className="create-preview-step-2__description">
          <DescriptionSection
            description={props.description}
            descriptionBgColor={props.descriptionBgColor || '#6C757D'}
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
