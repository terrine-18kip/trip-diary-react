import { useCallback, useContext } from 'react'
import axios from '../../axios'

import { UserContext } from '../../Context'
import { Spot } from '../../types/Types'

export const useUpdateSpotOrder = () => {
  const { user } = useContext(UserContext)

  const updateOrder = useCallback(async (items: Spot[]) => {
    if (!user) return
    await axios.post('/spots/order', items)
  }, [])

  return { updateOrder }
}
