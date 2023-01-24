import { useCallback, useContext } from 'react'
import axios from 'axios'

import { UserContext } from '../../../Context'

const apiUrl = process.env.REACT_APP_API_URL

export const useDeletePlace = () => {
  const { user } = useContext(UserContext)

  const deletePlace = useCallback(async (id: number | undefined) => {
    if (!user || !id) return false
    const result = confirm('削除しますか？')
    if (!result) return false
    try {
      await axios.delete(`${apiUrl}/places/${id}`, {
        withCredentials: true,
      })
      return true
    } catch (error) {
      return false
    }
  }, [])

  return { deletePlace }
}
