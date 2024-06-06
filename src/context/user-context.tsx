import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'
import { components } from '../domain/api/types/api-types.ts'
import { organisations, user } from '../domain/api/data'

export type UserContext = {
  user?: components['schemas']['UserResponse']['data']
  organization?: components['schemas']['OrganizationResponse']['data']
  fetchUser: VoidFunction
  fetchOrganization: VoidFunction
}

export const UserContext = createContext<UserContext>({
  user: undefined,
  organization: undefined,
  fetchUser: () => {},
  fetchOrganization: () => {},
})

export default function UserContextProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<components['schemas']['UserResponse']['data']>()
  const [orgData, setOrgData] = useState<components['schemas']['OrganizationResponse']['data']>()

  const canFetchOrg = !orgData && userData?.role === 'employer'
  const canFetchUser = !userData

  const fetchUser = useCallback(() => {
    if (canFetchUser) {
      user
        .me()
        .then((userRes) => setUserData(userRes.data))
        .catch((e) => console.error(e))
    }
  }, [canFetchUser])

  const fetchOrganization = useCallback(() => {
    if (canFetchOrg) {
      organisations
        .currentOrganization()
        .then((orgRes) => setOrgData(orgRes.data))
        .catch((e) => console.error(e))
    }
  }, [canFetchOrg])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  useEffect(() => {
    fetchOrganization()
  }, [fetchOrganization])
  return (
    <UserContext.Provider value={{ fetchUser, user: userData, organization: orgData, fetchOrganization }}>
      {children}
    </UserContext.Provider>
  )
}
