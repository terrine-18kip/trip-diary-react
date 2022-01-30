import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Card, Space, Button, Form, Input, InputNumber } from 'antd'
import {
  FormOutlined,
  EditOutlined,
  DeleteOutlined,
  DeleteFilled,
  PlusOutlined,
  PlusCircleFilled,
} from '@ant-design/icons'
import moment from 'moment'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const apiUrl = process.env.REACT_APP_API_URL

type Trip = {
  id?: number
  title?: string
  start_date?: string | null
  end_date?: string | null
  memo?: string | null
  thumb?: string | null
  created_at?: string
  updated_at?: string
  plans?: Plan[]
}

type Plan = {
  id: number
  daily: number
  trip_id: number
  created_at?: string
  updated_at?: string
}

const TripDetail: React.FC = () => {
  const [trip, setTrip] = useState<Trip>({})
  const [plans, setPlans] = useState<Plan[]>([])
  const [planNum, setPlanNum] = useState<number | null>(1)
  const [editingPlan, setEditingPlan] = useState<number | null>()
  const navigation = useNavigate()
  const params = useParams()

  useEffect(() => {
    getTrip()
  }, [])

  useEffect(() => {
    if (plans.length === 0) {
      setPlanNum(1)
      return
    }
    const dailyNum: number = plans[plans.length - 1].daily
    setPlanNum(dailyNum + 1)
  }, [plans])

  async function getTrip() {
    try {
      const res = await axios.get(`${apiUrl}/trips/${params.id}`)
      setTrip(res.data)
      setPlans(res.data.plans)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteTrip() {
    const result = confirm('削除しますか？')
    if (!result) {
      return
    }
    try {
      await axios.delete(`${apiUrl}/trips/${trip.id}`)
      navigation('/')
    } catch (error) {
      console.log(error)
    }
  }

  async function addPlan() {
    if (!planNum) {
      return
    }
    try {
      const res = await axios.post(`${apiUrl}/plans`, {
        trip_id: trip.id,
        daily: planNum,
      })
      getTrip()
    } catch (error) {
      console.log(error)
    }
  }

  async function updatePlan(id: number, value: string) {
    if (!value) {
      setEditingPlan(null)
      return
    }
    try {
      await axios.put(`${apiUrl}/plans/${id}`, {
        trip_id: trip.id,
        daily: Number(value),
      })
      await getTrip()
      setEditingPlan(null)
    } catch (error) {
      console.log(error)
    }
  }

  async function deletePlan(id: number) {
    const result = confirm('削除しますか？')
    if (!result) {
      return
    }
    try {
      const res = await axios.delete(`${apiUrl}/plans/${id}`)
      console.log(res)
      getTrip()
    } catch (error) {
      console.log(error)
    }
  }

  const styles = {
    container: css`
      width: 100%;
      min-height: 100vh;
      padding: 10px 20px;
      background-color: #fafafa;
    `,
    plans: css`
      padding: 20px 10px;
    `,
    plan: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding: 2px 10px;
      border-radius: 2px;
      background-color: #ecd4c2;
    `,
    planNum: css`
      margin: 0;
      cursor: pointer;
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

  const dailyElement = (plan: Plan): JSX.Element => {
    if (plan.id === editingPlan) {
      return (
        <span>
          <InputNumber
            css={styles.planInput}
            size='small'
            defaultValue={plan.daily}
            autoFocus={true}
            onBlur={(event) => updatePlan(plan.id, event.target.value)}
          />
          日目
        </span>
      )
    } else {
      return (
        <p css={styles.planNum} onClick={() => setEditingPlan(plan.id)}>
          {plan.daily}日目
        </p>
      )
    }
  }

  return (
    <div css={styles.container}>
      <h2>☆旅の詳細☆</h2>
      <Card
        title={trip.title}
        extra={
          <Space>
            <Link key='edit' to={`/${trip.id}/edit`}>
              <Button shape='circle' icon={<FormOutlined />} />
            </Link>
            <Button
              shape='circle'
              icon={<DeleteOutlined />}
              onClick={deleteTrip}
            />
          </Space>
        }
        bordered={false}
      >
        <p>
          期間：{trip.start_date} ～ {trip.end_date}
        </p>
        <p>メモ：{trip.memo}</p>
      </Card>

      <div css={styles.plans}>
        {plans.map((plan: Plan) => {
          return (
            <div key={plan.id} css={styles.plan}>
              {dailyElement(plan)}
              <Button
                type='text'
                shape='circle'
                size='small'
                icon={<DeleteFilled />}
                onClick={() => {
                  deletePlan(plan.id)
                }}
              />
            </div>
          )
        })}
        <Form onFinish={addPlan} css={[styles.plan, styles.planForm]}>
          <span>
            <InputNumber
              value={planNum ? planNum : ''}
              css={styles.planInput}
              size='small'
              onChange={(event) => setPlanNum(event ? Number(event) : null)}
            />
            日目
          </span>
          <Button
            shape='circle'
            type='text'
            size='small'
            htmlType='submit'
            icon={<PlusCircleFilled />}
          />
        </Form>
        {/* <Button shape='circle' icon={<PlusOutlined />} onClick={addPlan} /> */}
      </div>
    </div>
  )
}

export default TripDetail
