import React, { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

type User = {
  id?: number
  name?: string
  email?: string
  created_at?: string
  updated_at?: string
  trips?: Trip[]
}
type Trip = {
  id: number
  title: string
  start_date: string | null
  end_date: string | null
  memo: string | null
  thumb: string | null
  created_at?: string
  updated_at?: string
}

const UserContext = createContext(
  {} as {
    user: User
  },
)

const UserProvider = (props: any) => {
  const [user, setUser] = useState<User>({})
  const navigation = useNavigate()
  const locationHook = useLocation()

  useEffect(() => {
    checkUser()
  }, [locationHook.pathname])

  const checkUser = (): void => {
    const path: string = locationHook.pathname
    if (path === '/login/' || path === '/entry/') {
      return
    }
    fetchUser()
  }

  async function fetchUser() {
    try {
      const res = await axios.get(`${apiUrl}/user`, {
        withCredentials: true,
      })
      setUser(res.data)
    } catch (error) {
      navigation('/login')
    }
  }

  return (
    <UserContext.Provider value={{ user }}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
