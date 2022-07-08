import React, { createContext, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { User } from './types/Types'
import { useAuthUser } from './hooks/user/useAuthUser'

const UserContext = createContext(
  {} as {
    user: User | undefined
    getAuthUser: () => Promise<void>
  },
)

const UserProvider = (props: any) => {
  const { user, getAuthUser } = useAuthUser()
  const locationHook = useLocation()

  useLayoutEffect(() => {
    getAuthUser()
  }, [locationHook.pathname])

  return <UserContext.Provider value={{ user, getAuthUser }}>{props.children}</UserContext.Provider>
}

export { UserContext, UserProvider }
