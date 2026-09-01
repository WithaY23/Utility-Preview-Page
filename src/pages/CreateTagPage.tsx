import '../styles/CreateTagPage.css'
import NavBar from './NavBar'

function CreateTagPage() {
  return (
    <>
    <NavBar />
    <main className="create-tag-page" aria-label="Create tag page">
      <section className="create-tag-card" aria-labelledby="create-tag-heading">
        <h1 id="create-tag-heading">Create a New Tag!</h1>

        <form className="create-tag-form">
          <label className="create-tag-form__label" htmlFor="tag-name">
            Tag Name:
          </label>

          <input
            id="tag-name"
            className="create-tag-form__input"
            type="text"
            name="tagName"
            defaultValue=""
            placeholder="Example: Marvel Marathon"
            aria-label="Tag name"
          />

          <button type="submit" className="create-tag-form__button">
            Create Tag
          </button>
        </form>
      </section>
    </main>
    </>
  )
}

export default CreateTagPage
