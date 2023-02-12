import axios from 'axiosInstance'
import { message } from 'antd'

type Data = {
  password: string
  current_password: string
  password_confirmation: string
}

export const useAdminAuth = () => {
  const logout = async () => {
    const result = confirm('ログアウトしますか？')
    if (!result) return
    await axios.get(`/logout`)
    message.success('ログアウトしました')
  }

  const updateName = async (name: string) => {
    try {
      await axios.post('/user/update_name', { name })
      return true
    } catch (error) {
      return false
    }
  }

  const updateEmail = async (email: string) => {
    try {
      await axios.post('/user/update_email', { email })
      return true
    } catch (error) {
      return false
    }
  }

  const updatePassword = async (data: Data) => {
    try {
      await axios.post('/user/update_password', data)
      return true
    } catch (error) {
      return false
    }
  }

  return { logout, updateName, updateEmail, updatePassword }
}
