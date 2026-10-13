// UserContext.tsx
import { createContext, use, useState, type ReactNode } from 'react'
import type { Tag } from '../types/tag'
import type { UserPersonalization } from '../types/login'
import { TAGS } from '../data/tags'
import type { Dispatch, SetStateAction } from 'react'

export interface UserProfile {
  email: string
  userPersonalization: UserPersonalization
}

interface UserContextType {
  user: UserProfile | null
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>
  updateTags:  Dispatch<SetStateAction<Tag[]>>
}

const defaultUser :  UserProfile = {
  email: '',
  userPersonalization: 
  {
    siteConfig: {'avatarUrl' : '', "logoUrl": '', "siteName" : 'adooo'},
    tags: TAGS 
  }
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultUser)

const updateTags: Dispatch<SetStateAction<Tag[]>> = (newItem) => {
  setUser((prev) => {
    if (!prev) return defaultUser;
    // Resolve whether newItem is an array or an updater function
    const resolvedTags = typeof newItem === 'function' ? newItem(prev.userPersonalization.tags) : newItem;
    return { ...prev, tags: resolvedTags };
  })
}

// const defaultUserContext : UserContextType= {
//   user: defaultUser,
//   setUser: setUser,
//   updateTags: updateTags
// }

  return (
    <UserContext value={{ user, setUser, updateTags }}>
      {children}
    </UserContext>
  )
}

export function useUser() {
  const context = use(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}