import type { LocalApp } from '../types/preview'

type LACProps = {
  app: LocalApp
  onSelect: (urlScheme: string) => void
}

function LocalAppClickable({ app, onSelect }: LACProps) {
  return (
    <button
      type="button"
      className="local-app-clickable"
      aria-label={`Select ${app.name}`}
      onClick={() => onSelect(app.urlScheme)}
    >
      <img
        className="local-app-clickable__image"
        src={app.imageURL}
        alt=""
        decoding="async"
      />
      <span className="local-app-clickable__name">{app.name}</span>
    </button>
  )
}

export default LocalAppClickable
