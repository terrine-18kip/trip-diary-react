import React, { useEffect, useLayoutEffect, useState, useContext } from 'react'
import { UserContext } from '../Context'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TripMember from './TripMember'
import SpotList from './SpotList'
import axios from 'axios'
import { styles } from '../styles/TripDetail.styles'
import { PageHeader, Card, Avatar, Space, Button, Form, InputNumber } from 'antd'
import {
  FormOutlined,
  DeleteOutlined,
  DeleteFilled,
  PlusCircleFilled,
  UserOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { Plan, User } from '../types/Types'
/** @jsxImportSource @emotion/react */

const apiUrl = process.env.REACT_APP_API_URL

type Trip = {
  id?: number
  uniqid?: string
  title?: string
  start_date?: string | null
  end_date?: string | null
  memo?: string | null
  thumb?: string | null
  privacy_id?: number
  created_at?: string
  updated_at?: string
  plans?: Plan[]
  users?: User[]
}

const TripDetail: React.FC = () => {
  const { user } = useContext(UserContext)
  const [trip, setTrip] = useState<Trip>({})
  const [plans, setPlans] = useState<Plan[]>([])
  const [planNum, setPlanNum] = useState<number | null>(1)
  const [showMember, setShowMember] = useState<boolean>(false)
  const [editingPlan, setEditingPlan] = useState<number | null>()
  const [unauthorized, setUnauthorized] = useState<boolean>(false)
  const navigation = useNavigate()
  const params = useParams()

  useLayoutEffect(() => {
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
      const res = await axios.get(`${apiUrl}/trips/find/${params.id}`, {
        withCredentials: true,
      })
      setTrip(res.data)
      setPlans(res.data.plans)
      console.log(res.data)
    } catch (error) {
      console.log(error)
      setUnauthorized(true)
    }
  }

  async function deleteTrip() {
    if (!user) {
      return
    }
    const result = confirm('削除しますか？')
    if (!result) {
      return
    }
    try {
      await axios.delete(`${apiUrl}/trips/${trip.id}`, {
        withCredentials: true,
      })
      navigation('/')
    } catch (error) {
      console.log(error)
    }
  }

  async function addPlan() {
    if (!user || !planNum) {
      return
    }
    try {
      await axios.post(
        `${apiUrl}/plans`,
        {
          trip_id: trip.id,
          daily: planNum,
        },
        {
          withCredentials: true,
        },
      )
      getTrip()
    } catch (error) {
      console.log(error)
    }
  }

  async function updatePlan(id: number, old: number, value: string) {
    if (!user || !value || Number(value) === old) {
      setEditingPlan(null)
      return
    }
    try {
      await axios.put(
        `${apiUrl}/plans/${id}`,
        {
          trip_id: trip.id,
          daily: Number(value),
        },
        {
          withCredentials: true,
        },
      )
      await getTrip()
      setEditingPlan(null)
    } catch (error) {
      console.log(error)
    }
  }

  async function deletePlan(id: number) {
    if (!user) {
      return
    }
    const result = confirm('削除しますか？')
    if (!result) {
      return
    }
    try {
      const res = await axios.delete(`${apiUrl}/plans/${id}`, {
        withCredentials: true,
      })
      console.log(res)
      getTrip()
    } catch (error) {
      console.log(error)
    }
  }

  const onEnter = (id: number, old: number, event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      updatePlan(id, old, event.currentTarget.value)
    }
  }

  const dailyElement = (plan: Plan): JSX.Element => {
    if (!user) {
      return <p css={[styles.planNum, styles.disabled]}>{plan.daily}日目</p>
    } else if (plan.id === editingPlan) {
      return (
        <span>
          <InputNumber
            css={styles.planInput}
            size='small'
            defaultValue={plan.daily}
            autoFocus
            onBlur={(event) => updatePlan(plan.id, plan.daily, event.target.value)}
            onKeyPress={(event) => onEnter(plan.id, plan.daily, event)}
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

  if (unauthorized) {
    return (
      <div css={styles.unauthorized}>
        <InfoCircleOutlined style={{ color: '#999', fontSize: '24px' }} />
        <p>ページが見つかりませんでした</p>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title='旅の詳細'
        onBack={() => navigation('/')}
        extra={
          user && (
            <Button type='primary' onClick={() => setShowMember(true)}>
              メンバーを編集
            </Button>
          )
        }
      />
      {showMember && <TripMember trip={trip} getTrip={getTrip} setFlag={setShowMember} />}

      <Card
        title={trip.title}
        extra={
          user && (
            <Space>
              <Link key='edit' to={`/${trip.uniqid}/edit`}>
                <Button shape='circle' icon={<FormOutlined />} />
              </Link>
              <Button shape='circle' icon={<DeleteOutlined />} onClick={deleteTrip} />
            </Space>
          )
        }
        bordered={false}
      >
        <p>
          期間：{trip.start_date} ～ {trip.end_date}
        </p>
        <p>メモ：{trip.memo}</p>
        <p>公開設定：{trip.privacy_id === 2 ? '公開' : '非公開'}</p>
        <div css={styles.tripMembers}>
          メンバー：
          {trip.users?.map((user) => {
            return (
              <span css={styles.tripMember} key={user.id}>
                <Avatar size='small' icon={<UserOutlined />} />
                {user.name}
              </span>
            )
          })}
        </div>
      </Card>

      <div css={styles.plans}>
        {plans?.map((plan: Plan) => {
          return (
            <div key={plan.id}>
              <div css={styles.plan}>
                {dailyElement(plan)}
                {user && (
                  <Button
                    type='text'
                    shape='circle'
                    icon={<DeleteFilled />}
                    onClick={() => deletePlan(plan.id)}
                  />
                )}
              </div>
              <SpotList plan={plan} getTrip={getTrip} />
            </div>
          )
        })}

        {user && (
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
            <Button shape='circle' type='text' htmlType='submit' icon={<PlusCircleFilled />} />
          </Form>
        )}
      </div>
    </div>
  )
}

export default TripDetail
