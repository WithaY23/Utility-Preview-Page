import {
  shouldShowSeeAllTags,
  TAGS,
  tagsForHome,
} from '../data/tags'
import { TagSection } from '../components/TagSection'
import '../styles/preview.css'
import '../styles/HomePage.css'
import NavBar from './NavBar'
function HomePage() {
  const homeTags = tagsForHome(TAGS)

  return (
    <div className="home">
      <NavBar/>
      <section className="home__hero" aria-labelledby="home-title">
        <h1 id="home-title">?(Logo Title)</h1>
        <p className="home__subtext">?(With Subtext)</p>
      </section>

      {homeTags.map((tag) => (
        <TagSection key={tag.id} tag={tag} />
      ))}

      {shouldShowSeeAllTags(TAGS.length) ? (
        <button
          type="button"
          className="see-all-tags"
          // TODO: all-tags view — no extra page yet; placeholder only.
          onClick={() => undefined}
        >
          See All Tags
        </button>
      ) : null}
    </div>
  )
}

export default HomePage