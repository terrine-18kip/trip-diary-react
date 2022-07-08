import axios from 'axios'
import { Trip, User } from '../../types/Types'

const apiUrl = process.env.REACT_APP_API_URL

export const useRemoveMember = () => {
  const removeMember = async (trip: Trip, member: User) => {
    const result = confirm(`${member.name}さんを削除しますか？`)
    if (!result) return false

    const param = {
      trip_id: trip.id,
      user_id: member.id,
    }

    try {
      await axios.post(`${apiUrl}/trips/remove_member`, param, {
        withCredentials: true,
      })
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  return { removeMember }
}
