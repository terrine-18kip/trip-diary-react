import { useCallback, useContext } from 'react'
import axios from 'axios'
import { InputPlace } from '../../../types/Types'
import { UserContext } from '../../../Context'

const apiUrl = process.env.REACT_APP_API_URL

export const useUpdatePlace = () => {
  const { user } = useContext(UserContext)

  const updatePlace = useCallback(async (id: number | undefined, data: InputPlace) => {
    if (!user || !id) return false
    try {
      await axios.put(`${apiUrl}/places/${id}`, data, {
        withCredentials: true,
      })
      return true
    } catch (error) {
      return false
    }
  }, [])

  return { updatePlace }
}
