import type { SiteConfig } from "../context/SiteConfigContext"
import type { Tag } from "./tag"


export type UserPersonalization = 
{
    siteConfig: SiteConfig,
    tags:Tag[]
}
export type User = {
    email: string,
    password: string, 
    userPersonalization: UserPersonalization
}