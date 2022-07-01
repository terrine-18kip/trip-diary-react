import React, { useState, useContext } from 'react'
import { UserContext } from '../Context'
import axios from 'axios'
import { PageHeader, Alert, Avatar, Button, Form, Input } from 'antd'
import { UserOutlined, CloseOutlined } from '@ant-design/icons'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Trip } from '../types/Types'

const apiUrl = process.env.REACT_APP_API_URL

type Props = {
  trip: Trip
  getTrip: any
  setFlag: React.Dispatch<React.SetStateAction<boolean>>
}

type Data = {
  trip_id?: number
  email?: string
}

const TripMember: React.FC<Props> = ({ trip, getTrip, setFlag }) => {
  const { user } = useContext(UserContext)
  const [data, setData] = useState<Data>({ trip_id: trip?.id })
  const [errorMessage, setErrorMessage] = useState<string>('')

  async function addMember() {
    try {
      await axios.post(`${apiUrl}/trips/add_member`, data, {
        withCredentials: true,
      })
      setErrorMessage('')
      await getTrip()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return setErrorMessage(error.response?.data.message)
      }
    }
  }

  async function removeMember(userId: number, userName: string) {
    const result = confirm(`${userName}さんを削除しますか？`)
    if (!result) {
      return
    }
    try {
      const res = await axios.post(
        `${apiUrl}/trips/remove_member`,
        {
          trip_id: trip.id,
          user_id: userId,
        },
        {
          withCredentials: true,
        },
      )
      console.log(res)
      await getTrip()
    } catch (error) {
      console.log(error)
    }
  }

  const styles = {
    wrapper: css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 100;
    `,
    container: css`
      width: 80%;
      max-width: 720px;
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 5px;
      text-align: center;
      background-color: #fafafa;
    `,
    tripMember: css`
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    `,
    form: css`
      display: flex;
    `,
  }

  return (
    <div css={styles.wrapper}>
      <div css={styles.container}>
        <PageHeader
          style={{ padding: 0, marginBottom: '16px' }}
          title='メンバーを編集'
          extra={<Button shape='circle' icon={<CloseOutlined />} onClick={() => setFlag(false)} />}
        />
        {errorMessage && (
          <Alert
            message={errorMessage}
            type='error'
            banner
            style={{ textAlign: 'left', marginBottom: '10px' }}
          />
        )}
        <div>
          {trip.users?.map((el) => {
            return (
              <div css={styles.tripMember} key={el.id}>
                <Avatar style={{ marginRight: '5px' }} icon={<UserOutlined />} />
                <span style={{ marginRight: '5px' }}>{el.name}</span>
                {el.id !== user!.id && (
                  <Button
                    shape='circle'
                    size='small'
                    type='text'
                    icon={<CloseOutlined />}
                    onClick={() => removeMember(el.id, el.name)}
                  />
                )}
              </div>
            )
          })}
        </div>
        <Form css={styles.form} onFinish={addMember}>
          <Input
            placeholder='メールアドレスを入力'
            onChange={(event) => setData({ ...data, email: event.target.value })}
          />
          <Button type='primary' htmlType='submit'>
            招待
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default TripMember
