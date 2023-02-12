import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Button, Form, Input, Space } from 'antd'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { T, useLogin } from './hooks'

const Login: React.FC = () => {
  const { login, loading } = useLogin()
  const [data, setData] = useState<T>({
    email: '',
    password: '',
  })

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
      <Form labelCol={{ span: 6 }} onFinish={() => login(data)}>
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
            <Button type='primary' htmlType='submit' loading={loading}>
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
