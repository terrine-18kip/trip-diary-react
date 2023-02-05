import axios from 'axiosInstance'
import { useCallback } from 'react'
import { InputPlace } from 'types/Types'

export const useAddPlace = () => {
  const addPlace = useCallback(async (data: InputPlace) => {
    try {
      await axios.post('/places', data)
      return true
    } catch (error) {
      return false
    }
  }, [])

  return { addPlace }
}
