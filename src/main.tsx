import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './client/components/App.tsx'
// import { SiteConfigProvider } from './client/context/SiteConfigContext.tsx'
import { UserProvider } from './client/context/UserConfigContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <SiteConfigProvider> */}
      <UserProvider>
        <App />
      </UserProvider>
    {/* </SiteConfigProvider> */}
  </StrictMode>,
)
