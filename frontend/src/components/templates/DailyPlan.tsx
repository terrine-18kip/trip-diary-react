import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Button, InputNumber } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import { UserContext } from '../../Context'
import SpotList from '../SpotList'
import { Plan } from '../../types/Types'
import { useUpdatePlan } from '../../hooks/plan/useUpdatePlan'
import { useDeletePlan } from '../../hooks/plan/useDeletePlan'

type Props = {
  tripId: number | undefined
  plan: Plan
  getTrip: (id: string | undefined) => Promise<void>
}

const DailyPlan: React.FC<Props> = ({ tripId, plan, getTrip }) => {
  const { user } = useContext(UserContext)
  const { updatePlan } = useUpdatePlan()
  const { deletePlan } = useDeletePlan()

  const [editing, setEditing] = useState<boolean>(false)
  const params = useParams()

  const styles = {
    plan: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2px 10px;
      border-radius: 2px;
      background-color: #ecd4c2;
    `,
    planNum: css`
      margin: 0;
      cursor: pointer;
    `,
    planInput: css`
      width: 55px;
      background-color: #fff;
    `,
    disabled: css`
      cursor: auto;
    `,
  }

  const handleUpdatePlan = async (id: number, old: number, value: string) => {
    const res = await updatePlan(id, old, value, tripId)
    if (res) await getTrip(params.id)
    setEditing(false)
  }

  const handleDeletePlan = async (id: number) => {
    const res = await deletePlan(id)
    if (res) getTrip(params.id)
  }

  const dailyElement = (plan: Plan): JSX.Element => {
    if (!user) {
      return <p css={[styles.planNum, styles.disabled]}>{plan.daily}日目</p>
    } else if (editing) {
      return (
        <span>
          <InputNumber
            css={styles.planInput}
            size='small'
            defaultValue={plan.daily}
            autoFocus
            onBlur={(event) => handleUpdatePlan(plan.id, plan.daily, event.target.value)}
            onKeyPress={(event) =>
              event.key === 'Enter' &&
              handleUpdatePlan(plan.id, plan.daily, event.currentTarget.value)
            }
          />
          日目
        </span>
      )
    } else {
      return (
        <p css={styles.planNum} onClick={() => setEditing(true)}>
          {plan.daily}日目
        </p>
      )
    }
  }

  return (
    <div key={plan.id}>
      <div css={styles.plan}>
        {dailyElement(plan)}
        {user && (
          <Button
            type='text'
            shape='circle'
            icon={<DeleteFilled />}
            onClick={() => handleDeletePlan(plan.id)}
          />
        )}
      </div>
      <SpotList plan={plan} getTrip={getTrip} />
    </div>
  )
}

export default DailyPlan
