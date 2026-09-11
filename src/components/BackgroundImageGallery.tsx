import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import type { BackgroundConfig } from '../types/preview'

const BACKGROUND_IMAGES = [
  { name: 'game-controller', path: '/image_reference/previewBackground/297738_game-controller-icon.png' },
  { name: 'jack-o-lantern', path: '/image_reference/previewBackground/340629_jack-o-lantern-icon.png' },
  { name: 'broom', path: '/image_reference/previewBackground/340633_broom-icon.png' },
  { name: 'witch-hat', path: '/image_reference/previewBackground/340634_witch-hat-icon.png' },
  { name: 'witch', path: '/image_reference/previewBackground/340636_witch-icon.png' },
]

const IMAGES_PER_PAGE = 4

type BackgroundImageGalleryProps = {
  // selectedImage: string | null
  // useColorBackground: boolean
  // backgroundColor: string
  backgroundConf: BackgroundConfig
  onImageSelect: (imagePath: string) => void
  onColorModeToggle: (useColor: boolean) => void
  onColorChange: (color: string) => void
  
}

export function BackgroundImageGallery({
  // selectedImage,
  // useColorBackground,
  // backgroundColor,
  backgroundConf,
  onImageSelect,
  onColorModeToggle,
  onColorChange
}: BackgroundImageGalleryProps) {
  const [page, setPage] = useState(0)

  const maxPages = Math.ceil(BACKGROUND_IMAGES.length / IMAGES_PER_PAGE)
  const startIdx = page * IMAGES_PER_PAGE
  const endIdx = startIdx + IMAGES_PER_PAGE
  const visibleImages = BACKGROUND_IMAGES.slice(startIdx, endIdx)
  
  const hasNextPage = page + 1 < maxPages
  const hasPrevPage = page > 0

  const handleImageSelect = (imagePath: string) => {
    onColorModeToggle(false)
    onImageSelect(imagePath)
  }

  const handleColorModeToggle = () => {
    console.log('color is bg!')
    onColorModeToggle(true)
  }

  return (
    <div className="background-gallery">
      <h3 className="background-gallery__title">Select Background</h3>
      
      {backgroundConf.backgroundType == 'image' ? (
        <div className="background-gallery__container">
          {hasPrevPage && (
            <button
              type="button"
              className="background-gallery__arrow"
              aria-label="Previous backgrounds"
              onClick={() => setPage((current) => current - 1)}
            >
              <span
                className="background-gallery__chevron background-gallery__chevron--previous"
                aria-hidden="true"
              />
            </button>
          )}

          <div className="background-gallery__grid">
            {visibleImages.map((img) => (
              <button
                key={img.name}
                type="button"
                className={`background-gallery__item ${
                  backgroundConf.backgroundImage === img.path ? 'background-gallery__item--active' : ''
                }`}
                onClick={() => handleImageSelect(img.path)}
                aria-label={`Select ${img.name} background`}
              >
                <img
                  src={img.path}
                  alt=""
                  className="background-gallery__image"
                  decoding="async"
                />
              </button>
            ))}

            {!hasNextPage && (
              <button
                type="button"
                className="background-gallery__item background-gallery__item--color-option"
                onClick={handleColorModeToggle}
                aria-label="Switch to color picker"
              >
                <span className="background-gallery__color-swatch" />
                <span className="background-gallery__color-label">Color</span>
              </button>
            )}
          </div>

          {hasNextPage && (
            <button
              type="button"
              className="background-gallery__arrow"
              aria-label="Next backgrounds"
              onClick={() => setPage((current) => current + 1)}
            >
              <span className="background-gallery__chevron" aria-hidden="true" />
            </button>
          )}

          {!hasPrevPage && !hasNextPage && visibleImages.length === IMAGES_PER_PAGE && (
            <button
              type="button"
              className="background-gallery__item background-gallery__item--color-option"
              onClick={handleColorModeToggle}
              aria-label="Switch to color picker"
            >
              <span className="background-gallery__color-swatch" />
              <span className="background-gallery__color-label">Color</span>
            </button>
          )}
        </div>
      ) :backgroundConf.backgroundType == 'color'  ?(
        <div className="background-gallery__color-picker-container">
          <button
            type="button"
            className="background-gallery__back-button"
            onClick={() => {onColorModeToggle(false); handleImageSelect(visibleImages[0].path)}}
          >
            ← Back to Images
          </button>
          <div className="background-gallery__color-picker">
            <HexColorPicker color={backgroundConf.backgroundColor} onChange={onColorChange} />
          </div>
          <div className="background-gallery__color-value">{backgroundConf.backgroundColor}</div>
        </div>
      ): <div className="background-gallery__container">
          {hasPrevPage && (
            <button
              type="button"
              className="background-gallery__arrow"
              aria-label="Previous backgrounds"
              onClick={() => setPage((current) => current - 1)}
            >
              <span
                className="background-gallery__chevron background-gallery__chevron--previous"
                aria-hidden="true"
              />
            </button>
          )}

          <div className="background-gallery__grid">
            {visibleImages.map((img) => (
              <button
                key={img.name}
                type="button"
                className={`background-gallery__item`}
                onClick={() => handleImageSelect(img.path)}
                aria-label={`Select ${img.name} background`}
              >
                <img
                  src={img.path}
                  alt=""
                  className="background-gallery__image"
                  decoding="async"
                />
              </button>
            ))}

            {!hasNextPage && (
              <button
                type="button"
                className="background-gallery__item background-gallery__item--color-option"
                onClick={handleColorModeToggle}
                aria-label="Switch to color picker"
              >
                <span className="background-gallery__color-swatch" />
                <span className="background-gallery__color-label">Color</span>
              </button>
            )}
          </div>

          {hasNextPage && (
            <button
              type="button"
              className="background-gallery__arrow"
              aria-label="Next backgrounds"
              onClick={() => setPage((current) => current + 1)}
            >
              <span className="background-gallery__chevron" aria-hidden="true" />
            </button>
          )}

          {!hasPrevPage && !hasNextPage && visibleImages.length === IMAGES_PER_PAGE && (
            <button
              type="button"
              className="background-gallery__item background-gallery__item--color-option"
              onClick={handleColorModeToggle}
              aria-label="Switch to color picker"
            >
              <span className="background-gallery__color-swatch" />
              <span className="background-gallery__color-label">Color</span>
            </button>
          )}
        </div>}
      
    </div>
  )
}
