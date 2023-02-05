import React, { useContext, useState } from 'react'
import { Drawer, Button, Form, Input, message } from 'antd'

import { useAdminAuth } from 'hooks/auth/useAdminAuth'
import { UserContext } from 'Context'

type Props = {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const EditName: React.FC<Props> = ({ show, setShow }) => {
  const { user, getAuthUser } = useContext(UserContext)
  const { updateName } = useAdminAuth()
  const [name, setName] = useState<string>('')

  if (!user) {
    return <></>
  }

  async function handleSubmit() {
    const res = await updateName(name)
    if (res) {
      message.success('名前を変更しました')
      getAuthUser()
      setShow(false)
    }
  }

  return (
    <Drawer title='名前を編集' placement='bottom' visible={show} onClose={() => setShow(false)}>
      <Form labelCol={{ span: 6 }} onFinish={handleSubmit}>
        <Form.Item
          name='name'
          label='新しい名前を入力'
          initialValue={user.name}
          rules={[{ required: true, message: '名前を入力してください' }]}
        >
          <Input onChange={(event) => setName(event.target.value)} />
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

export default EditName
