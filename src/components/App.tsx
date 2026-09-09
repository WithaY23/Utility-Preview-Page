import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TAGS } from '../data/tags'
import HomePage from '../pages/HomePage'
import SearchTags from '../pages/SearchTags'
import CreateTagPage from '../pages/CreateTagPage'
import CreatePreviewPage from '../pages/CreatePreviewPage'
import type { Tag } from '../types/tag'

function App() {
  const [tags, setTags] = useState<Tag[]>(TAGS)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage tags={tags} />} />
        <Route path="/view" element={<SearchTags tags={tags} />} />
        <Route path="/create-tag" element={<CreateTagPage tags={tags} setTags={setTags}/>} />
        <Route
          path="/tags/:tagId/create-preview"
          element={<CreatePreviewPage tags={tags} setTags={setTags} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App