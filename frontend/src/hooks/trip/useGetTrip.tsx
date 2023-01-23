import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Trip, Plan, Place } from '../../types/Types'

const apiUrl = process.env.REACT_APP_API_URL

export const useGetTrip = () => {
  const [trip, setTrip] = useState<Trip | undefined>(undefined)
  const [plans, setPlans] = useState<Plan[]>([])
  const [places, setPlaces] = useState<Place[]>([])
  const [unauthorized, setUnauthorized] = useState<boolean>(false)
  const params = useParams()

  const getTrip = useCallback(async () => {
    const id = params.id
    if (!id) {
      return setUnauthorized(true)
    }
    try {
      const res = await axios.get(`${apiUrl}/trips/find/${id}`, {
        withCredentials: true,
      })
      setTrip(res.data)
      setPlans(res.data.plans)
      setPlaces(res.data.places)
    } catch (error) {
      setUnauthorized(true)
    }
  }, [])

  return { trip, plans, places, unauthorized, getTrip }
}
