import { HexColorPicker } from 'react-colorful'

type DescriptionSectionProps = {
  description: string
  descriptionBgColor: string
  onDescriptionChange: (text: string) => void
  onDescriptionBgColorChange: (color: string) => void
}

export function DescriptionSection({
  description,
  descriptionBgColor,
  onDescriptionChange,
  onDescriptionBgColorChange,
}: DescriptionSectionProps) {
  return (
    <div className="description-section">
      <h3 className="description-section__title">Preview Details</h3>

      <div className="description-section__form-group">
        <label className="description-section__label" htmlFor="preview-description">
          Description:
        </label>
        <textarea
          id="preview-description"
          className="description-section__input"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Describe your preview (e.g., 'My personal portfolio showcasing my work')"
          rows={4}
        />
      </div>

      <div className="description-section__form-group">
        <label className="description-section__label" htmlFor="desc-bg-color">
          Description Box Background Color:
        </label>
        {/* <button
          id="desc-bg-color"
          type="button"
          className="description-section__color-button"
          onClick={() => setShowColorPicker(!showColorPicker)}
          style={{ backgroundColor: descriptionBgColor }}
          aria-expanded={showColorPicker}
        >
          <span className="sr-only">{descriptionBgColor}</span>
        </button> */}

        <div className="description-section__color-picker">
          <HexColorPicker
            color={descriptionBgColor}
            onChange={onDescriptionBgColorChange}
          />
          <div className="description-section__color-value">{descriptionBgColor}</div>
        </div>
      </div>
    </div>
  )
}
