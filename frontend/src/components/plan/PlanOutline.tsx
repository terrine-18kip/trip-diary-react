import React, { useState, useContext } from 'react'
import { Button, InputNumber } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import { TripContext, UserContext } from '../../Context'
import { Plan } from '../../types/Types'
import { useUpdatePlan } from '../../hooks/plan/useUpdatePlan'
import { useDeletePlan } from '../../hooks/plan/useDeletePlan'

type Props = {
  tripId: number | undefined
  plan: Plan
}

const PlanOutline: React.FC<Props> = ({ tripId, plan }) => {
  const { user } = useContext(UserContext)
  const { getTrip } = useContext(TripContext)
  const { updatePlan } = useUpdatePlan()
  const { deletePlan } = useDeletePlan()

  const [editing, setEditing] = useState<boolean>(false)

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
    if (res) await getTrip()
    setEditing(false)
  }

  const handleDeletePlan = async (id: number) => {
    const res = await deletePlan(id)
    if (res) getTrip()
  }

  return (
    <div css={styles.plan}>
      {user ? (
        <>
          {editing ? (
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
          ) : (
            <p css={styles.planNum} onClick={() => setEditing(true)}>
              {plan.daily}日目
            </p>
          )}
          <Button
            type='text'
            shape='circle'
            icon={<DeleteFilled />}
            onClick={() => handleDeletePlan(plan.id)}
          />
        </>
      ) : (
        <p css={[styles.planNum, styles.disabled]} onClick={() => setEditing(true)}>
          {plan.daily}日目
        </p>
      )}
    </div>
  )
}

export default PlanOutline
