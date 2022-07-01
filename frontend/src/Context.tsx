import React, { createContext, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { User } from './types/Types'
import { useAuthUser } from './hooks/user/useAuthUser'

const UserContext = createContext(
  {} as {
    user: User | undefined
  },
)

const UserProvider = (props: any) => {
  const { user, getAuthUser } = useAuthUser()
  const locationHook = useLocation()

  useLayoutEffect(() => {
    getAuthUser()
  }, [locationHook.pathname])

  return <UserContext.Provider value={{ user }}>{props.children}</UserContext.Provider>
}

export { UserContext, UserProvider }
