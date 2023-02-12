import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import axios from 'axiosInstance'

export type T = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export const useEntry = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigate()

  const entry = async (data: T) => {
    try {
      setLoading(true)
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/entry', data)
      message.success('新規登録しました')
      navigation('/')
    } catch (error) {
      message.error('入力情報を確認してください')
    } finally {
      setLoading(false)
    }
  }

  return { entry, loading }
}
