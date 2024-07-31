import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'
import { components } from '../domain/api/types/api-types.ts'
import { organisations, user } from '../domain/api/data'

export type UserContext = {
  user?: components['schemas']['UserResponse']['data']
  organization?: components['schemas']['OrganizationResponse']['data']
  fetchUser: VoidFunction
  fetchOrganization: VoidFunction
  refetchAll: VoidFunction
  updateUser: (user: components['schemas']['UserResponse']['data'] | undefined) => void
  logoutUser: VoidFunction
}

export const UserContext = createContext<UserContext>({
  user: undefined,
  organization: undefined,
  fetchUser: () => {},
  fetchOrganization: () => {},
  refetchAll: () => {},
  updateUser: () => {},
  logoutUser: () => {},
})

export default function UserContextProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<components['schemas']['UserResponse']['data']>()
  const [orgData, setOrgData] = useState<components['schemas']['OrganizationResponse']['data']>()

  const canFetchOrg = !orgData && userData?.role === 'employer'
  const canFetchUser = !userData

  const fetchUser = useCallback(() => {
    if (canFetchUser) {
      return user
        .me()
        .then((userRes) => {
          setUserData(userRes.data)
          return userRes
        })
        .catch((e) => console.error(e))
    }
    return
  }, [canFetchUser])

  const fetchOrganization = useCallback(() => {
    if (canFetchOrg) {
      organisations
        .currentOrganization()
        .then((orgRes) => setOrgData(orgRes.data))
        .catch((e) => console.error(e))
    }
  }, [canFetchOrg])

  const refetchAll = useCallback(async () => {
    setUserData(undefined)
    setOrgData(undefined)
    try {
      const { data: userRes } = await user.me()
      setUserData(userRes)
      if (userRes.role === 'employer') {
        const { data: orgRes } = await organisations.currentOrganization()
        setOrgData(orgRes)
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  const updateUser = useCallback((user: components['schemas']['UserResponse']['data'] | undefined) => {
    if (!user) {
      return
    }
    setUserData(user)
  }, [])

  const logoutUser = useCallback(() => {
    setUserData(undefined)
    setOrgData(undefined)
    localStorage.removeItem('token')
    window.location.assign('/')
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  useEffect(() => {
    fetchOrganization()
  }, [fetchOrganization])
  return (
    <UserContext.Provider
      value={{
        fetchUser,
        user: userData,
        organization: orgData,
        fetchOrganization,
        refetchAll,
        updateUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
