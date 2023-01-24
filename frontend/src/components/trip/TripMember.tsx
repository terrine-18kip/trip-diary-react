import React, { useState, useContext } from 'react'
import { PageHeader, Alert, Button, Form, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { UserContext } from '../../Context'
import { Trip, User } from '../../types/Types'
import { useAddMember } from '../../hooks/member/useAddMember'
import { useRemoveMember } from '../../hooks/member/useRemoveMember'
import MemberIcon from '../common/MemberIcon'

type Props = {
  trip: Trip
  getTrip: () => Promise<void>
  setFlag: React.Dispatch<React.SetStateAction<boolean>>
}

const TripMember: React.FC<Props> = ({ trip, getTrip, setFlag }) => {
  const { addMember, errorMessage } = useAddMember()
  const { removeMember } = useRemoveMember()
  const { user } = useContext(UserContext)
  const [email, setEmail] = useState<string>('')

  const handleSubmit = async () => {
    const res = await addMember(trip.id, email)
    res && getTrip()
  }

  const handleRemove = async (member: User) => {
    const res = await removeMember(trip, member)
    res && getTrip()
  }

  const styles = {
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
    <>
      <PageHeader
        style={{ padding: 0, marginBottom: '16px' }}
        title='メンバーを編集'
        extra={
          <Button
            type='text'
            shape='circle'
            icon={<PlusOutlined rotate={45} />}
            onClick={() => setFlag(false)}
          />
        }
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
                  icon={<PlusOutlined rotate={45} />}
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
    </>
  )
}

export default TripMember
