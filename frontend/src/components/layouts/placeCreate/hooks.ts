import axios from 'axios'
import { useCallback } from 'react'
import { InputSpot } from '../../../types/Types'

const apiUrl = process.env.REACT_APP_API_URL

export const useAddPlace = () => {
  const addPlace = useCallback(async (data: InputSpot) => {
    try {
      await axios.post(`${apiUrl}/places`, data, {
        withCredentials: true,
      })
      return true
    } catch (error) {
      return false
    }
  }, [])

  return { addPlace }
}
