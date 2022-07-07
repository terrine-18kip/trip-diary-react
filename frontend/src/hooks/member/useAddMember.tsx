import axios from 'axios'
import { useState } from 'react'

const apiUrl = process.env.REACT_APP_API_URL

type Data = {
  trip_id?: number
  email?: string
}

export const useAddMember = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')

  const addMember = async (data: Data) => {
    try {
      await axios.post(`${apiUrl}/trips/add_member`, data, {
        withCredentials: true,
      })
      setErrorMessage('')
      return true
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message)
      }
      return false
    }
  }

  return { addMember, errorMessage }
}
