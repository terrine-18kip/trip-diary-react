import { useCallback, useContext } from "react"
import axios from "axios"

import { UserContext } from "../../Context"
import { InputSpot } from "../../types/Types"

const apiUrl = process.env.REACT_APP_API_URL

export const useUpdateSpot = () => {
  const {user} = useContext(UserContext)

  const updateSpot = useCallback(async (id: number | undefined, data: InputSpot) => {
    if (!user || !id) return false
    try {
      await axios.put(`${apiUrl}/spots/${id}`, data, {
        withCredentials: true,
      })
      return true
    } catch (error) {
      return false
    }
  }, [])

  return {updateSpot}
}