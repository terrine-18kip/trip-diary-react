import { useCallback, useState } from 'react'
import axios from 'axiosInstance'
import { User } from 'types/Types'

export const useAuthUser = () => {
  const [user, setUser] = useState<User | undefined>(undefined)

  const getAuthUser = useCallback(async () => {
    try {
      const res = await axios.get<User>('/user')
      setUser(res.data)
    } catch (error) {
      setUser(undefined)
    }
  }, [])

  return { user, getAuthUser }
}
