import React, { createContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Place, Plan, Trip, User } from 'types/Types'
import { useAuthUser } from 'hooks/user/useAuthUser'
import { useGetTrip } from 'hooks/trip/useGetTrip'

const UserContext = createContext(
  {} as {
    user: User | undefined
    getAuthUser: () => Promise<void>
  },
)

const UserProvider = (props: any) => {
  const { user, getAuthUser } = useAuthUser()
  const locationHook = useLocation()

  useEffect(() => {
    getAuthUser()
  }, [locationHook.pathname])

  return <UserContext.Provider value={{ user, getAuthUser }}>{props.children}</UserContext.Provider>
}

const TripContext = createContext(
  {} as {
    trip: Trip | undefined
    plans: Plan[]
    places: Place[]
    unauthorized: boolean
    getTrip: () => Promise<void>
  },
)

const TripProvider = (props: any) => {
  const { trip, plans, places, unauthorized, getTrip } = useGetTrip()

  return (
    <TripContext.Provider value={{ trip, plans, places, unauthorized, getTrip }}>
      {props.children}
    </TripContext.Provider>
  )
}

export { UserContext, UserProvider, TripContext, TripProvider }
