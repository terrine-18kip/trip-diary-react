import { useCallback, useContext } from 'react'
import axios from 'axiosInstance'
import { UserContext } from 'Context'

export const useAddPlan = () => {
  const { user } = useContext(UserContext)

  const addPlan = useCallback(async (tripId: number | undefined, planNum: number | null) => {
    if (!user || !tripId || !planNum) return false
    try {
      await axios.post('/plans', { trip_id: tripId, daily: planNum })
      return true
    } catch (error) {
      return false
    }
  }, [])

  return { addPlan }
}
