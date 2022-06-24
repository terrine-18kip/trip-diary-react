import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button, InputNumber } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import { Trip, Plan } from '../../types/Types'
import { useAddPlan } from '../../hooks/plan/useAddPlan'

type Props = {
  trip: Trip
  plans: Plan[]
  getTrip: (id: string | undefined) => Promise<void>
}

const PlanCreate: React.FC<Props> = ({ trip, plans, getTrip }) => {
  const { addPlan } = useAddPlan()

  const [planNum, setPlanNum] = useState<number | null>(1)
  const params = useParams()

  useEffect(() => {
    if (plans.length === 0) {
      setPlanNum(1)
      return
    }
    const dailyNum: number = plans[plans.length - 1].daily
    setPlanNum(dailyNum + 1)
  }, [plans])

  const handleSubmitPlan = async () => {
    const res = await addPlan(trip.id, planNum)
    if (res) getTrip(params.id)
  }

  const styles = {
    plan: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2px 10px;
      border-radius: 2px;
      background-color: #ecd4c2;
    `,
    planForm: css`
      width: 80%;
      margin: 0 auto;
    `,
    planInput: css`
      width: 55px;
      background-color: #fff;
    `,
  }

  return (
    <Form onFinish={handleSubmitPlan} css={[styles.plan, styles.planForm]}>
      <span>
        <InputNumber
          value={planNum ? planNum : ''}
          css={styles.planInput}
          size='small'
          onChange={(event) => setPlanNum(event ? Number(event) : null)}
        />
        日目
      </span>
      <Button shape='circle' type='text' htmlType='submit' icon={<PlusCircleFilled />} />
    </Form>
  )
}

export default PlanCreate
