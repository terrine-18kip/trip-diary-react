import { useCallback, useContext } from 'react'
import { UserContext } from '../../Context'
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

export const useUpdatePlan = () => {
  const { user } = useContext(UserContext)

  const updatePlan = useCallback(
    async (id: number, old: number, value: string, tripId: number | undefined) => {
      const daily = Number(value)
      if (!user || !tripId || !value || daily === old) return false
      try {
        await axios.put(
          `${apiUrl}/plans/${id}`,
          {
            trip_id: tripId,
            daily: daily,
          },
          {
            withCredentials: true,
          },
        )
        return true
      } catch (error) {
        return false
      }
    },
    [],
  )

  return { updatePlan }
}
