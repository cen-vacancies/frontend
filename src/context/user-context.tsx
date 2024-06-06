import { createContext, ReactNode, useEffect, useState } from 'react'
import { components } from '../domain/api/types/api-types.ts'
import { user } from '../domain/api/data'

export type UserContext = {
  user?: components['schemas']['UserResponse']['data']
  organization?: components['schemas']['OrganizationResponse']['data']
  fetchUser: VoidFunction
}

export const UserContext = createContext<UserContext>({
  user: undefined,
  organization: undefined,
  fetchUser: () => {},
})

export default function UserContextProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<components['schemas']['UserResponse']['data']>()
  const fetchUser = () => {
    if (!userData) {
      user
        .me()
        .then((userRes) => setUserData(userRes.data))
        .catch((e) => console.error(e))
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])
  return <UserContext.Provider value={{ fetchUser, user: userData }}>{children}</UserContext.Provider>
}
