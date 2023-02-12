import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import axios from 'axiosInstance'

export type T = {
  email: string
  password: string
}

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigate()

  const login = async (data: T) => {
    try {
      setLoading(true)
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/login', data)
      message.success('ログインしました')
      navigation('/')
    } catch (error) {
      message.error('ログインに失敗しました')
    } finally {
      setLoading(false)
    }
  }

  return { login, loading }
}
