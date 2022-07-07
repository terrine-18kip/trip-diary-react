import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

type Entry = {
  name?: string
  email?: string
  password?: string
  password_confirmation?: string
}

export const useAdminAuth = () => {

  const initializeCsrf = async () => {
    await axios.get(`${apiUrl}/sanctum/csrf-cookie`, {
      withCredentials: true,
    })
  }

  const entry = async (data: Entry) => {
    await axios.post(`${apiUrl}/entry`, data, {
      withCredentials: true,
    })
  }

  const login = async (data: Entry) => {
    await axios.post(`${apiUrl}/login`, data, {
      withCredentials: true,
    })
  }

  const logout = async () => {
    try {
      const result = confirm('ログアウトしますか？')
      if (!result) return
      await axios.get(`${apiUrl}/logout`, {
        withCredentials: true,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return { initializeCsrf, entry, login, logout }
}
