import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { PageHeader, Alert, Button, Form, Input } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { UserContext } from '../../Context'
import { Trip, User } from '../../types/Types'
import { useAddMember } from '../../hooks/member/useAddMember'
import { useRemoveMember } from '../../hooks/member/useRemoveMember'
import MemberIcon from '../common/MemberIcon'

type Props = {
  trip: Trip
  getTrip: any
  setFlag: React.Dispatch<React.SetStateAction<boolean>>
}

const TripMember: React.FC<Props> = ({ trip, getTrip, setFlag }) => {
  const { addMember, errorMessage } = useAddMember()
  const { removeMember } = useRemoveMember()
  const { user } = useContext(UserContext)
  const [email, setEmail] = useState<string>('')
  const params = useParams()

  const handleSubmit = async () => {
    const res = await addMember(trip.id, email)
    res && getTrip()
  }

  const handleRemove = async (member: User) => {
    const res = await removeMember(trip, member)
    res && getTrip()
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
          {trip.users?.map((member) => {
            return (
              <div css={styles.tripMember} key={member.id}>
                <MemberIcon member={member} />
                {member.id !== user!.id && (
                  <Button
                    shape='circle'
                    size='small'
                    type='text'
                    icon={<CloseOutlined />}
                    onClick={() => handleRemove(member)}
                  />
                )}
              </div>
            )
          })}
        </div>
        <Form css={styles.form} onFinish={handleSubmit}>
          <Input
            placeholder='メールアドレスを入力'
            onChange={(event) => setEmail(event.target.value)}
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
