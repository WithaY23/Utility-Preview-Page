import { useState,useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import type { BackgroundConfig } from '../types/preview'
import { LOCAL_BACKGROUND_IMAGES, WEB_BACKGROUND_IMAGE_COUNT } from '../data/preview'
import { apiErrorMessage, fetchPhotos } from '../server/api'
import type { PreviewDraft } from '../pages/CreatePreviewStep2'

const IMAGES_PER_PAGE = 4

type BackgroundImageGalleryProps = {
  // selectedImage: string | null
  // useColorBackground: boolean
  // backgroundColor: string
  previewDraft: PreviewDraft
  backgroundConf: BackgroundConfig
  onImageSelect: (imagePath: string) => void
  onColorModeToggle: (useColor: boolean) => void
  onColorChange: (color: string) => void
  
}

export function BackgroundImageGallery({
  previewDraft,
  backgroundConf,
  onImageSelect,
  onColorModeToggle,
  onColorChange
}: BackgroundImageGalleryProps) {
  const [page, setPage] = useState(0)
  const [backgroundImages, setBackgroundImages] = useState(LOCAL_BACKGROUND_IMAGES)
  useEffect(() =>
  {
    const fetchData = async() =>
    {
      try{
        const unsplashBGPhotos = await fetchPhotos(previewDraft.title)
        if(unsplashBGPhotos.length == 0)
        {
          console.log('no images received')
        }
        else if((unsplashBGPhotos[0] == apiErrorMessage))
        {
          console.log(apiErrorMessage)
        }
        else
        {
          console.log( unsplashBGPhotos.length, ' images received')
          const dataImages = unsplashBGPhotos.map((v,index ) => ({name: String(index) + v, path:v }))
          setBackgroundImages((prev) =>[...prev, ...dataImages])
        }
      }
      catch(error)
      {
        console.error('error getting background photo', error)
      }
      
    }
    fetchData()
    return () => {
      console.log('i"m being remoovveedddd')
      setBackgroundImages(LOCAL_BACKGROUND_IMAGES)
    }
  }, [])
  // promise api call to get more images in Promise dummy
  
  const maxPages = Math.ceil(backgroundImages.length / IMAGES_PER_PAGE)
  const startIdx = page * IMAGES_PER_PAGE
  const endIdx = startIdx + IMAGES_PER_PAGE

  const hasNextPage = page + 1 < maxPages
  const hasPrevPage = page > 0

  // get data from dummy in data[] = await dummy
  // put images in front via setBackgroundImages(...data, ...backgroundImages)
  // replace local with new bckgImg var

  const visibleImages = backgroundImages.slice(startIdx, endIdx)
  
  

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
