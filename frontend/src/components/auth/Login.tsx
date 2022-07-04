import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageHeader, Button, Form, Input, Space } from 'antd'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useAdminAuth } from '../../hooks/auth/useAdminAuth'

type Login = {
  email?: string
  password?: string
}

const Login: React.FC = () => {
  const { initializeCsrf, login } = useAdminAuth()
  const [data, setData] = useState<Login>({})
  const navigation = useNavigate()

  async function handleSubmit() {
    try {
      await initializeCsrf()
      await login(data)
      navigation(`/`)
    } catch (error) {
      console.log(error)
    }
  }

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
      <PageHeader title='ログイン' />
      <Form labelCol={{ span: 6 }} onFinish={handleSubmit}>
        <Form.Item
          name='email'
          label='メールアドレス'
          rules={[{ required: true, message: 'メールアドレスを入力してください' }]}
        >
          <Input onChange={(event) => setData({ ...data, email: event.target.value })} />
        </Form.Item>

        <Form.Item
          name='password'
          label='パスワード'
          rules={[{ required: true, message: 'パスワードを入力してください' }]}
        >
          <Input.Password
            onChange={(event) => setData({ ...data, password: event.target.value })}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Space direction='vertical'>
            <Button type='primary' htmlType='submit'>
              ログイン
            </Button>
            <Link to='/entry'>新規登録はこちら</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
