import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { PageHeader, Button, Form, Input, Space } from 'antd'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const apiUrl = process.env.REACT_APP_API_URL

type Login = {
  name?: string
  email?: string
  password?: string
  password_confirmation?: string
}

const Entry: React.FC = () => {
  const [data, setData] = useState<Login>({})
  const navigation = useNavigate()

  // const initializeCsrf = async () => {
  //   try {
  //     const res = await axios.get(`${apiUrl}/sanctum/csrf-cookie`)
  //     console.log(res)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  async function handleSubmit() {
    try {
      const res = await axios.post(`${apiUrl}/entry`, data, {
        withCredentials: true,
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   initializeCsrf()
  // }, [])

  const styles = {
    container: css`
      width: 100%;
      min-height: 100vh;
      padding: 20px 40px;
      background-color: #fafafa;
    `,
  }

  return (
    <div css={styles.container}>
      <PageHeader title='新規登録' />
      <Form labelCol={{ span: 6 }} onFinish={handleSubmit}>
        <Form.Item
          name='name'
          label='名前'
          rules={[{ required: true, message: '名前を入力してください' }]}
        >
          <Input
            onChange={(event) => setData({ ...data, name: event.target.value })}
          />
        </Form.Item>

        <Form.Item
          name='email'
          label='メールアドレス'
          rules={[
            { required: true, message: 'メールアドレスを入力してください' },
          ]}
        >
          <Input
            onChange={(event) =>
              setData({ ...data, email: event.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          name='password'
          label='パスワード'
          rules={[{ required: true, message: 'パスワードを入力してください' }]}
        >
          <Input.Password
            onChange={(event) =>
              setData({ ...data, password: event.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          name='password_confirmation'
          label='パスワード（確認）'
          rules={[{ required: true, message: 'パスワードを入力してください' }]}
        >
          <Input.Password
            onChange={(event) =>
              setData({ ...data, password_confirmation: event.target.value })
            }
          />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Space>
            <Button type='primary' htmlType='submit'>
              新規登録
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Entry
