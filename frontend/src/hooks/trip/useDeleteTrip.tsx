import { useCallback, useContext } from 'react'
import { UserContext } from '../../Context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

export const useDeleteTrip = () => {
  const { user } = useContext(UserContext)
  const navigation = useNavigate()

  const deleteTrip = useCallback(async (id: number | undefined) => {
    if (!user || !id) return
    const result = confirm('削除しますか？')
    if (!result) {
      return
    }
    try {
      await axios.delete(`${apiUrl}/trips/${id}`, {
        withCredentials: true,
      })
      navigation('/')
    } catch (error) {
      console.log(error)
    }
  }, [])

  return { deleteTrip }
}
