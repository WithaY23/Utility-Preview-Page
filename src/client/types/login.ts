import type { SiteConfig } from "../context/SiteConfigContext"

export type User = {
    email: string,
    password: string, 
    siteConfig: SiteConfig
}