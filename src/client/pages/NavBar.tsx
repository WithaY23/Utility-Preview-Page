import '../styles/NavBar.css'
import { useSiteConfig } from '../context/SiteConfigContext'
import { NavLink, Link } from 'react-router-dom'
import { useAuthModal } from '../util'
import AccountModalContainer from '../components/AccountModalContainer'

export default function NavBar() {
  const { config } = useSiteConfig()
  // const authStatement = "auth=signin"
  const {setAuthParam} = useAuthModal()
  return (
    <header className="navbar__header">
      <Link
          to="/"
          className="navbar__logo"
        >
          {config.siteName}
        </Link>
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
        <a onClick={ () => {setAuthParam('signin')}} >
          <span className="navbar__avatar" aria-label="Profile" role="img" />
          <AccountModalContainer />
        </a>
      </nav>
    </header>
  )
}