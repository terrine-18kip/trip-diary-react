import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageHeader, Button, Form, Input, Space, message } from 'antd'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useAdminAuth } from '../../hooks/auth/useAdminAuth'

type Entry = {
  name?: string
  email?: string
  password?: string
  password_confirmation?: string
}

const Entry: React.FC = () => {
  const { initializeCsrf, entry, login } = useAdminAuth()
  const [data, setData] = useState<Entry>({})
  const navigation = useNavigate()

  async function handleSubmit() {
    try {
      await initializeCsrf()
      await entry(data)
      await login(data)
      message.success('新規登録しました')
      navigation(`/`)
    } catch (error) {
      message.error('入力情報を確認してください')
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
      <PageHeader title='新規登録' />
      <Form labelCol={{ span: 6 }} onFinish={handleSubmit}>
        <Form.Item
          name='name'
          label='名前'
          rules={[{ required: true, message: '名前を入力してください' }]}
        >
          <Input onChange={(event) => setData({ ...data, name: event.target.value })} />
        </Form.Item>

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

        <Form.Item
          name='password_confirmation'
          label='パスワード（確認）'
          rules={[{ required: true, message: 'パスワードを入力してください' }]}
        >
          <Input.Password
            onChange={(event) => setData({ ...data, password_confirmation: event.target.value })}
          />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Space direction='vertical'>
            <Button type='primary' htmlType='submit'>
              新規登録
            </Button>
            <Link to='/login'>ログインはこちら</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Entry
