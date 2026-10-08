import { useState, type Dispatch, type SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/CreateTagPage.css'
import NavBar from './NavBar'
import type { Tag } from '../types/tag'
import { tagAnchorId } from '../util'


type CreateTagProps = {
  tags: Tag[],
  setTags: Dispatch<SetStateAction<Tag[]>>
}
function CreateTagPage({tags, setTags}: CreateTagProps) {
  const [tagName, setTagName] = useState('')
  const navigate = useNavigate()

  const handleCreateTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newTag: Tag = {
      id: String(tags.length+1),
      name: tagName,
      previews: [],
    }

    console.log('Created tag:', newTag)
    setTagName('')
    setTags(tags.concat(newTag))
    console.log("tags updated", tags[-1])
    navigate(`/view#${tagAnchorId(newTag.name)}`)
  }

  return (
    <>
    <NavBar />
    <main className="create-tag-page" aria-label="Create tag page">
      <section className="create-tag-card" aria-labelledby="create-tag-heading">
        <h1 id="create-tag-heading">Create a New Tag!</h1>

        <form className="create-tag-form" onSubmit={handleCreateTag}>
          <label className="create-tag-form__label" htmlFor="tag-name">
            Tag Name:
          </label>

          <input
            id="tag-name"
            className="create-tag-form__input"
            type="text"
            name="tagName"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
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
