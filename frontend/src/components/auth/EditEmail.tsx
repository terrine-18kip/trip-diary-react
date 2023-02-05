import React, { useContext, useState } from 'react'
import { Drawer, Button, Form, Input, Alert, message } from 'antd'

import { useAdminAuth } from 'hooks/auth/useAdminAuth'
import { UserContext } from 'Context'

type Props = {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const EditEmail: React.FC<Props> = ({ show, setShow }) => {
  const { user, getAuthUser } = useContext(UserContext)
  const { updateEmail } = useAdminAuth()
  const [email, setEmail] = useState<string>(user?.email ?? '')
  const [emailConfirm, setEmailConfirm] = useState<string>(user?.email ?? '')
  const [showConfirm, setShowConfirm] = useState<boolean>(false)

  if (!user) {
    return <></>
  }

  async function handleSubmit() {
    if (email !== emailConfirm) {
      return setShowConfirm(true)
    }
    const res = await updateEmail(email)
    if (res) {
      message.success('メールアドレスを変更しました')
      getAuthUser()
      setShow(false)
    }
  }

  return (
    <Drawer
      title='メールアドレスを編集'
      placement='bottom'
      visible={show}
      onClose={() => setShow(false)}
    >
      {showConfirm && <Alert message='メールアドレスが一致しません' type='error' showIcon />}

      <Form labelCol={{ span: 6 }} onFinish={handleSubmit}>
        <Form.Item
          name='email'
          label='新しいメールアドレス'
          initialValue={user.email}
          rules={[
            { type: 'email', message: '正しいメールアドレスを入力してください' },
            { required: true, message: 'メールアドレスを入力してください' },
          ]}
        >
          <Input onChange={(event) => setEmail(event.target.value)} />
        </Form.Item>

        <Form.Item
          name='email_confirm'
          label='新しいメールアドレス（確認）'
          initialValue={user.email}
          rules={[
            { type: 'email', message: '正しいメールアドレスを入力してください' },
            { required: true, message: 'メールアドレスを入力してください' },
          ]}
        >
          <Input onChange={(event) => setEmailConfirm(event.target.value)} />
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

export default EditEmail
