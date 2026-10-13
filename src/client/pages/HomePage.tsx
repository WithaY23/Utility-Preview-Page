import { shouldShowSeeAllTags, tagsForHome } from '../data/tags'
import { TagSection } from '../components/TagSection'
import '../styles/preview.css'
import '../styles/HomePage.css'
import NavBar from './NavBar'
import type { Tag } from '../types/tag'
// import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserConfigContext'


type HomePageProps = {
  tags: Tag[]
}

function HomePage({ tags }: HomePageProps) {
  const homeTags = tagsForHome(tags)
  const {user} = useUser()

  return (
    <div className="home">
      <NavBar/>
      <section className="home__hero" aria-labelledby="home-title">
        <h1 id="home-title">{user?.userPersonalization.siteConfig.siteName}</h1>
        <p className="home__subtext">?(With Subtext)</p>
      </section>

      {homeTags.map((tag) => (
        <TagSection key={tag.name} tag={tag} />
      ))}

      {shouldShowSeeAllTags(tags.length) ? (
        <Link
          to="/view"
          className="see-all-tags"
        >
          See All Tags
        </Link>
      ) : null}

    </div>
  )
}

export default HomePage