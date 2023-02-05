import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, InputNumber } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import { useAddPlan } from 'hooks/plan/useAddPlan'
import { TripContext } from 'Context'

const PlanCreate: React.FC = () => {
  const { addPlan } = useAddPlan()

  const { trip, plans, getTrip } = useContext(TripContext)
  const [planNum, setPlanNum] = useState<number | null>(1)

  if (!trip) return <></>

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
    if (res) getTrip()
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
