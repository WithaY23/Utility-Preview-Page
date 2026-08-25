import '../styles/NavBar.css'
import { useSiteConfig } from '../context/SiteConfigContext'
export default function NavBar()
{
    const { config } = useSiteConfig()
    return (
        <header className="navbar__header">
        <p className="navbar__logo">{config.siteName}</p>
      </header>
    )
}