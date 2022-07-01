import axios from 'axios'
import { useCallback, useState } from 'react'
import { User } from '../../types/Types'

const apiUrl = process.env.REACT_APP_API_URL

export const useAuthUser = () => {
  const [user, setUser] = useState<User | undefined>(undefined)

  const getAuthUser = useCallback(async () => {
    try {
      const res = await axios.get<User>(`${apiUrl}/user`, {
        withCredentials: true,
      })
      setUser(res.data)
    } catch (error) {
      setUser(undefined)
    }
  }, [])

  return { user, getAuthUser }
}
