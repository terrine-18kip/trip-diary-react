import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { UserContext } from '../../Context'
import { InputTrip } from '../../types/Types'

const apiUrl = process.env.REACT_APP_API_URL

export const useCreateTrip = () => {
  const { user } = useContext(UserContext)
  const navigation = useNavigate()

  const createTrip = async (data: InputTrip) => {
    if (!user) return
    try {
      const res = await axios.post(
        `${apiUrl}/trips`,
        { ...data, user_id: user.id },
        {
          withCredentials: true,
        },
      )
      navigation(`/${res.data.uniqid}`)
    } catch (error) {
      console.log(error)
    }
  }

  return { createTrip }
}
