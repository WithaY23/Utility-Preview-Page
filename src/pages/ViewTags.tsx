import { useParams } from 'react-router-dom'
import { useSiteConfig } from '../context/SiteConfigContext'
import { useNavigate } from 'react-router-dom'

function ViewTags() {
  const { tags } = useParams()
  const { config, updateConfig } = useSiteConfig()
  const navigate = useNavigate()
  return (
    <div className="view-tags">
      {tags === 'Docs' ? (
        <>
          <label htmlFor="site-name">Site name</label>
          <input
            id="site-name"
            type="text"
            value={config.siteName}
            onChange={(e) => updateConfig({ siteName: e.target.value })}
          />
        <button onClick={() => navigate('/')}> home return </button>
        </>
        
      ) : (
        <h1>hello {tags}</h1>
      )}
    </div>
  )
}

export default ViewTags