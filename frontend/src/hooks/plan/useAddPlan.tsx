import { useCallback, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../Context'

const apiUrl = process.env.REACT_APP_API_URL

export const useAddPlan = () => {
  const { user } = useContext(UserContext)

  const addPlan = useCallback(async (tripId: number | undefined, planNum: number | null) => {
    if (!user || !tripId || !planNum) return false
    try {
      await axios.post(
        `${apiUrl}/plans`,
        {
          trip_id: tripId,
          daily: planNum,
        },
        {
          withCredentials: true,
        },
      )
      return true
    } catch (error) {
      return false
    }
  }, [])

  return { addPlan }
}
