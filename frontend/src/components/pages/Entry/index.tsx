import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Button, Form, Input, Space } from 'antd'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { T, useEntry } from './hooks'

const Entry: React.FC = () => {
  const { entry, loading } = useEntry()
  const [data, setData] = useState<T>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
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
      <PageHeader title='新規登録' />
      <Form labelCol={{ span: 6 }} onFinish={() => entry(data)}>
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

        <p>
          <Link to='/terms'>利用規約</Link>および
          <Link to='/privacy_policy'>プライバシーポリシー</Link>に同意の上ご登録ください
        </p>

        <Form.Item style={{ textAlign: 'center' }}>
          <Space direction='vertical'>
            <Button type='primary' htmlType='submit' loading={loading}>
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
