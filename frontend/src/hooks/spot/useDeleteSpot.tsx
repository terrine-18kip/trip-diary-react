import { useCallback, useContext } from 'react'
import axios from '../../axios'

import { UserContext } from '../../Context'

export const useDeleteSpot = () => {
  const { user } = useContext(UserContext)

  const deleteSpot = useCallback(async (id: number | undefined) => {
    if (!user || !id) return false
    const result = confirm('削除しますか？')
    if (!result) return false
    try {
      await axios.delete(`/spots/${id}`)
      return true
    } catch (error) {
      return false
    }
  }, [])

  return { deleteSpot }
}
