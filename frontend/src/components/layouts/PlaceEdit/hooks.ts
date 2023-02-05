import { useCallback, useContext } from 'react'
import axios from 'axiosInstance'
import { InputPlace } from 'types/Types'
import { UserContext } from 'Context'

export const useUpdatePlace = () => {
  const { user } = useContext(UserContext)

  const updatePlace = useCallback(async (id: number | undefined, data: InputPlace) => {
    if (!user || !id) return false
    try {
      await axios.put(`/places/${id}`, data)
      return true
    } catch (error) {
      return false
    }
  }, [])

  return { updatePlace }
}
