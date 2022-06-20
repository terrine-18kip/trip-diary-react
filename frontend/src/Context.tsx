import React, { createContext, useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { User } from './types/Types'

const apiUrl = process.env.REACT_APP_API_URL

const UserContext = createContext(
  {} as {
    user: User | null
  },
)

const UserProvider = (props: any) => {
  const [user, setUser] = useState<User | null>(null)
  // const navigation = useNavigate()
  const locationHook = useLocation()

  useLayoutEffect(() => {
    fetchUser()
  }, [locationHook.pathname])

  async function fetchUser() {
    try {
      const res = await axios.get(`${apiUrl}/user`, {
        withCredentials: true,
      })
      setUser(res.data)
      console.log(res.data)
    } catch (error) {
      setUser(null)
    }
  }

  return <UserContext.Provider value={{ user }}>{props.children}</UserContext.Provider>
}

export { UserContext, UserProvider }
