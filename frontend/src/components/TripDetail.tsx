import React, { useEffect, useLayoutEffect, useState, useContext } from 'react'
import { UserContext } from '../Context'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TripMember from './TripMember'
import SpotList from './SpotList'
import axios from 'axios'
import {
  PageHeader,
  Card,
  Avatar,
  Space,
  Button,
  Form,
  InputNumber,
} from 'antd'
import {
  FormOutlined,
  DeleteOutlined,
  DeleteFilled,
  PlusCircleFilled,
  UserOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import moment from 'moment'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

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

type Plan = {
  id: number
  daily: number
  trip_id: number
  created_at?: string
  updated_at?: string
  spots: Spot[]
}

type Spot = {
  id?: number
  plan_id?: number
  start_time?: string
  end_time?: string
  category_id?: number
  name?: string
  fee?: number
  link?: string
  memo?: string
  order: number
  created_at?: string
  updated_at?: string
}

type User = {
  id: number
  name: string
  email: string
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
      console.log(res)
    } catch (error) {
      console.log(error)
      setUnauthorized(true)
    }
  }

  async function deleteTrip() {
    if (!user.id) {
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
    if (!user.id || !planNum) {
      return
    }
    try {
      const res = await axios.post(
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
    if (!user.id || !value || Number(value) === old) {
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
    if (!user.id) {
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

  const onEnter = (
    id: number,
    old: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === 'Enter') {
      updatePlan(id, old, event.currentTarget.value)
    }
  }

  const styles = {
    container: css`
      width: 100%;
      min-height: 100vh;
      padding: 10px 20px;
      background-color: #fafafa;
      @media screen and (max-width: 768px) {
        padding: 5px 3%;
      }
    `,
    tripMember: css`
      display: flex;
      align-items: center;
      margin-right: 10px;
    `,
    plans: css`
      padding: 20px 10px;
      @media screen and (max-width: 768px) {
        padding: 15px 2%;
      }
    `,
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
    planForm: css`
      width: 80%;
      margin: 0 auto;
    `,
    planInput: css`
      width: 55px;
      background-color: #fff;
    `,
    disabled: css`
      cursor: auto;
    `,
    unauthorized: css`
      height: calc(100vh - 100px);
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        margin-left: 10px;
        margin-bottom: 0;
        color: #555;
        font-size: 16px;
        font-weight: 500;
      }
    `,
  }

  const dailyElement = (plan: Plan): JSX.Element => {
    if (!user.id) {
      return <p css={[styles.planNum, styles.disabled]}>{plan.daily}日目</p>
    } else if (plan.id === editingPlan) {
      return (
        <span>
          <InputNumber
            css={styles.planInput}
            size='small'
            defaultValue={plan.daily}
            autoFocus
            onBlur={(event) =>
              updatePlan(plan.id, plan.daily, event.target.value)
            }
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
          user.id && (
            <Button type='primary' onClick={() => setShowMember(true)}>
              メンバーを編集
            </Button>
          )
        }
      />
      {showMember && (
        <TripMember trip={trip} getTrip={getTrip} setFlag={setShowMember} />
      )}
      <Card
        title={trip.title}
        extra={
          user.id && (
            <Space>
              <Link key='edit' to={`/${trip.uniqid}/edit`}>
                <Button shape='circle' icon={<FormOutlined />} />
              </Link>
              <Button
                shape='circle'
                icon={<DeleteOutlined />}
                onClick={deleteTrip}
              />
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
        <div css={styles.tripMember}>
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
                {user.id && (
                  <Button
                    type='text'
                    shape='circle'
                    icon={<DeleteFilled />}
                    onClick={() => {
                      deletePlan(plan.id)
                    }}
                  />
                )}
              </div>
              <SpotList plan={plan} getTrip={getTrip} />
            </div>
          )
        })}

        {user.id && (
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
              htmlType='submit'
              icon={<PlusCircleFilled />}
            />
          </Form>
        )}
      </div>
    </div>
  )
}

export default TripDetail
