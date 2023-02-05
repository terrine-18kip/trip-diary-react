import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from '../../axios'
import { Trip, Plan, Place } from '../../types/Types'

export const useGetTrip = () => {
  const [trip, setTrip] = useState<Trip | undefined>(undefined)
  const [plans, setPlans] = useState<Plan[]>([])
  const [places, setPlaces] = useState<Place[]>([])
  const [unauthorized, setUnauthorized] = useState<boolean>(false)
  const [tripId, setTripId] = useState<string | undefined>()
  const location = useLocation()

  useEffect(() => {
    const urlArray = location.pathname.split('/')
    setTripId(urlArray[1])
  }, [location.pathname])

  useEffect(() => {
    getTrip()
  }, [tripId])

  const getTrip = async () => {
    if (!tripId) {
      return setTrip(undefined)
    }
    try {
      const res = await axios.get<Trip>(`/trips/find/${tripId}`)
      setUnauthorized(false)
      setTrip(res.data)
      setPlans(res.data.plans ?? [])
      setPlaces(res.data.places ?? [])
    } catch (error) {
      setUnauthorized(true)
    }
  }

  return { trip, plans, places, unauthorized, getTrip }
}
