/* eslint-disable react-refresh/only-export-components */

import { createContext, use, useState } from 'react'
import type { ReactNode } from 'react'

interface SiteConfig {
  siteName: string
  logoUrl: string
  avatarUrl: string
}

interface SiteConfigContextType {
  config: SiteConfig
  updateConfig: (updates: Partial<SiteConfig>) => void
}

const DEFAULT_CONFIG: SiteConfig = {
  siteName: '(Logo | DEF LOGO)',
  logoUrl: '',
  avatarUrl: '',
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(
  undefined,
)

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG)

  const updateConfig = (updates: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }

  return (
    <SiteConfigContext value={{ config, updateConfig }}>
      {children}
    </SiteConfigContext>
  )
}

export function useSiteConfig(): SiteConfigContextType {
  const context = use(SiteConfigContext)
  if (context === undefined) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider')
  }
  return context
}
