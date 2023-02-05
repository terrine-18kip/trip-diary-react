import axios from 'axiosInstance'
import { useCallback } from 'react'
import { InputSpot } from 'types/Types'

export const useAddSpot = () => {
  const addSpot = useCallback(async (data: InputSpot) => {
    try {
      await axios.post('/spots', data)
      return true
    } catch (error) {
      return false
    }
  }, [])

  return { addSpot }
}
