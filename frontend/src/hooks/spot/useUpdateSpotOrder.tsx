import { useCallback, useContext } from 'react'
import axios from 'axios'

import { UserContext } from '../../Context'
import { Spot } from '../../types/Types'

const apiUrl = process.env.REACT_APP_API_URL

export const useUpdateSpotOrder = () => {
  const { user } = useContext(UserContext)

  const updateOrder = useCallback(async (items: Spot[]) => {
    if (!user) return
    await axios.post(`${apiUrl}/spots/order`, items, {
      withCredentials: true,
    })
  }, [])

  return { updateOrder }
}
