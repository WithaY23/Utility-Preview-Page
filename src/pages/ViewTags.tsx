import { useParams } from 'react-router-dom'

function ViewTags() {
  const { tags } = useParams()

  return (
    <div className="view-tags">
      <h1>hello {tags}</h1>
    </div>
  )
}

export default ViewTags