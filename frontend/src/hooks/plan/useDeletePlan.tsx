import { useCallback, useContext } from 'react'
import { UserContext } from '../../Context'
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

export const useDeletePlan = () => {
  const { user } = useContext(UserContext)

  const deletePlan = useCallback(async (id: number) => {
    if (!user) return false
    const result = confirm('削除しますか？')
    if (!result) return false

    try {
      await axios.delete(`${apiUrl}/plans/${id}`, {
        withCredentials: true,
      })
      return true
    } catch (error) {
      return false
    }
  }, [])

  return { deletePlan }
}
