import { useState } from 'react'
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

export const useAddMember = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')

  const addMember = async (trip_id: number, email: string) => {
    const param = {
      trip_id: trip_id,
      email: email,
    }

    try {
      await axios.post(`${apiUrl}/trips/add_member`, param, {
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
