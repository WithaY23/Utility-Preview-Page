import type { CSSProperties } from 'react'
import type { Preview } from '../types/preview'
import type { ReactNode } from 'react'
type PreviewCardProps = {
  preview: Preview
}
function getHrefType(href: string): "web" | "app" | "invalid" {
  try {
    const { protocol } = new URL(href.trim());
    return protocol === "http:" || protocol === "https:" ? "web" : "app";
  } catch {
    return "invalid";
  }
}
type PreviewLinkProps = {
  preview: Preview
  shellStyle: CSSProperties
  children: ReactNode
}

function PreviewLink({ preview, shellStyle, children }: PreviewLinkProps) {
  const type = getHrefType(preview.href);

  if (type === "web") {
    return (
      <a className="preview"
      href={preview.href}
      rel="noopener noreferrer"
      target="_blank"
      style={shellStyle}
      aria-label={`${preview.title}: ${preview.description}`}>
        {children}
      </a>
    );
  }

  if (type === "app") {
    // no target="_blank" — avoids the orphaned-tab issue
    // current-tab navigation risk (point 2) is the tradeoff, unless you add
    // an iframe-based attempt + fallback later
    return (
      <a className="preview"
      href={preview.href}
      style={shellStyle}
      aria-label={`${preview.title}: ${preview.description}`}>
        {children}
      </a>
    );
  }

  return <a title="Invalid link">{children}</a>;
}
export function PreviewCard({ preview }: PreviewCardProps) {
  const shellStyle: CSSProperties = {
    backgroundColor: preview.backgroundType == 'color' ? preview.backgroundColor : '',
  }
  const descrBG: CSSProperties = {
    backgroundColor: preview.descriptionBgColor ? preview.descriptionBgColor : '',
  }
  
  const contentBody = <>
  {preview.backgroundType == 'image' ? (
        <img
          className="preview__image"
          src={preview.backgroundImage}
          alt=""
          decoding="async"
          loading="lazy"
        />
      ) : null}

      <span className="preview__title">{preview.title}</span>
      <div className="preview__desc" style={descrBG}>
        <p className="preview__desc-text">{preview.description}</p>
      </div>
  </>

  return (<PreviewLink preview={preview} shellStyle={shellStyle} children={contentBody}></PreviewLink>
  )
}
