import { useCallback, useContext } from 'react'
import { UserContext } from '../../Context'
import axios from '../../axios'

export const useDeletePlan = () => {
  const { user } = useContext(UserContext)

  const deletePlan = useCallback(async (id: number) => {
    if (!user) return false
    const result = confirm('削除しますか？')
    if (!result) return false

    try {
      await axios.delete(`/plans/${id}`)
      return true
    } catch (error) {
      return false
    }
  }, [])

  return { deletePlan }
}
