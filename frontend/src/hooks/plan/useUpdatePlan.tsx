import { useCallback, useContext } from 'react'
import { UserContext } from '../../Context'
import axios from '../../axios'

export const useUpdatePlan = () => {
  const { user } = useContext(UserContext)

  const updatePlan = useCallback(
    async (id: number, old: number, value: string, tripId: number | undefined) => {
      const daily = Number(value)
      if (!user || !tripId || !value || daily === old) return false
      try {
        await axios.put(`/plans/${id}`, { trip_id: tripId, daily: daily })
        return true
      } catch (error) {
        return false
      }
    },
    [],
  )

  return { updatePlan }
}
