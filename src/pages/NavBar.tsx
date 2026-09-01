import '../styles/NavBar.css'
import { useSiteConfig } from '../context/SiteConfigContext'
import { NavLink, Link } from 'react-router-dom'

export default function NavBar() {
  const { config } = useSiteConfig()

  return (
    <header className="navbar__header">
      <p className="navbar__logo">{config.siteName}</p>
      <nav className="navbar__actions" aria-label="Primary navigation">
        <div className="navbar__create-group">
          <Link to="/create-tag" className="navbar__create-action" aria-label="Create a tag">
            <span>Create Tag</span>
            <span className="navbar__pencil" aria-hidden="true" />
          </Link>
        </div>
        <NavLink
          to="/view"
          className={({ isActive }) =>
            `navbar__link${isActive ? ' navbar__link--active' : ''}`
          }
        >
          Search Tags
        </NavLink>
        <span className="navbar__avatar" aria-label="Profile" role="img" />
      </nav>
    </header>
  )
}