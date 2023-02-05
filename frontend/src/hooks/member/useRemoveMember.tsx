import axios from '../../axios'
import { Trip, User } from '../../types/Types'

export const useRemoveMember = () => {
  const removeMember = async (trip: Trip, member: User) => {
    const result = confirm(`${member.name}さんを削除しますか？`)
    if (!result) return false

    const param = {
      trip_id: trip.id,
      user_id: member.id,
    }

    try {
      await axios.post('/trips/remove_member', param)
      return true
    } catch (error) {
      return false
    }
  }

  return { removeMember }
}
