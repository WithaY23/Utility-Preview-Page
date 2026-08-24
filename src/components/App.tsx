import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ViewTags from '../pages/ViewTags'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/view/:tags" element={<ViewTags />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App