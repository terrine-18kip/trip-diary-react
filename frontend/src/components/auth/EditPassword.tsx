import React, { useContext, useState } from 'react'
import { Drawer, Button, Form, Input, message } from 'antd'

import { useAdminAuth } from '../../hooks/auth/useAdminAuth'
import { UserContext } from '../../Context'

type Props = {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

type Data = {
  password: string
  current_password: string
  password_confirmation: string
}

const EditPassword: React.FC<Props> = ({ show, setShow }) => {
  const { user, getAuthUser } = useContext(UserContext)
  const { updatePassword } = useAdminAuth()
  const [data, setData] = useState<Data>({
    password: '',
    current_password: '',
    password_confirmation: '',
  })

  if (!user) {
    return <></>
  }

  async function handleSubmit() {
    const res = await updatePassword(data)
    if (res) {
      message.success('パスワードを変更しました')
      getAuthUser()
      setShow(false)
    }
  }

  return (
    <Drawer
      title='パスワードを編集'
      placement='bottom'
      visible={show}
      onClose={() => setShow(false)}
    >
      <Form labelCol={{ span: 6 }} onFinish={handleSubmit}>
        <Form.Item
          name='current_password'
          label='現在のパスワード'
          rules={[{ required: true, message: 'パスワードを入力してください' }]}
        >
          <Input.Password
            onChange={(event) => setData({ ...data, current_password: event.target.value })}
          />
        </Form.Item>

        <Form.Item
          name='password'
          label='新しいパスワード'
          rules={[{ required: true, message: 'パスワードを入力してください' }]}
        >
          <Input.Password
            onChange={(event) => setData({ ...data, password: event.target.value })}
          />
        </Form.Item>

        <Form.Item
          name='password_confirmation'
          label='新しいパスワード（確認）'
          rules={[{ required: true, message: 'パスワードを入力してください' }]}
        >
          <Input.Password
            onChange={(event) => setData({ ...data, password_confirmation: event.target.value })}
          />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Button type='primary' htmlType='submit'>
            変更する
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default EditPassword
