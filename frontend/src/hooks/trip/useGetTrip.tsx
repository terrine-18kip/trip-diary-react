import { useCallback, useState } from 'react'
import axios from 'axios'
import { Plan, User } from '../../types/Types'

const apiUrl = process.env.REACT_APP_API_URL

type Trip = {
  id?: number
  uniqid?: string
  title?: string
  start_date?: string | null
  end_date?: string | null
  memo?: string | null
  thumb?: string | null
  privacy_id?: number
  created_at?: string
  updated_at?: string
  plans?: Plan[]
  users?: User[]
}

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
