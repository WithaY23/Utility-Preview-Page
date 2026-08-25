import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App.tsx'
import { SiteConfigProvider } from './context/SiteConfigContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteConfigProvider>
      <App />
    </SiteConfigProvider>
  </StrictMode>,
)
