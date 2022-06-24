import { useCallback, useState } from 'react'
import axios from 'axios'
import { Trip, Plan } from '../../types/Types'

const apiUrl = process.env.REACT_APP_API_URL

export const useGetTrip = () => {
  const [trip, setTrip] = useState<Trip>({})
  const [plans, setPlans] = useState<Plan[]>([])
  const [unauthorized, setUnauthorized] = useState<boolean>(false)

  const getTrip = useCallback(async (id: string | undefined) => {
    if (!id) {
      return setUnauthorized(true)
    }
    try {
      const res = await axios.get(`${apiUrl}/trips/find/${id}`, {
        withCredentials: true,
      })
      setTrip(res.data)
      setPlans(res.data.plans)
    } catch (error) {
      setUnauthorized(true)
    }
  }, [])

  return { trip, plans, unauthorized, getTrip }
}
