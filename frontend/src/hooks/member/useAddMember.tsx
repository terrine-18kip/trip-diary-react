import { useState } from 'react'
import axios from 'axios'
import axiosInstance from 'axiosInstance'

export const useAddMember = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')

  const addMember = async (trip_id: number, email: string) => {
    const param = {
      trip_id: trip_id,
      email: email,
    }

    try {
      await axiosInstance.post('/trips/add_member', param)
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
