import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { UserContext } from '../../Context'
import { InputTrip, Trip } from '../../types/Types'

const apiUrl = process.env.REACT_APP_API_URL

export const useUpdateTrip = () => {
  const { user } = useContext(UserContext)
  const navigation = useNavigate()

  const updateTrip = async (id: number | undefined, data: InputTrip) => {
    if (!user || !id) return
    try {
      const res = await axios.put<Trip>(`${apiUrl}/trips/${id}`, data, {
        withCredentials: true,
      })
      navigation(`/${res.data.uniqid}`)
    } catch (error) {
      console.log(error)
    }
  }

  return { updateTrip }
}
