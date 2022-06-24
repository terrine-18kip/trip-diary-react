import React, { useEffect, useLayoutEffect, useState, useContext } from 'react'
import { UserContext } from '../../Context'
import { useNavigate, useParams } from 'react-router-dom'
import TripMember from '../TripMember'
import SpotList from '../SpotList'
import { styles } from '../../styles/TripDetail.styles'
import { PageHeader, Button, Form, InputNumber } from 'antd'
import { DeleteFilled, PlusCircleFilled, InfoCircleOutlined } from '@ant-design/icons'
import { Plan } from '../../types/Types'
import { useGetTrip } from '../../hooks/trip/useGetTrip'
import { useAddPlan } from '../../hooks/plan/useAddPlan'
import { useUpdatePlan } from '../../hooks/plan/useUpdatePlan'
import { useDeletePlan } from '../../hooks/plan/useDeletePlan'
import TripOutline from '../templates/TripOutline'
/** @jsxImportSource @emotion/react */

const TripDetail: React.FC = () => {
  const { user } = useContext(UserContext)
  const { trip, plans, unauthorized, getTrip } = useGetTrip()
  const { addPlan } = useAddPlan()
  const { updatePlan } = useUpdatePlan()
  const { deletePlan } = useDeletePlan()

  const [planNum, setPlanNum] = useState<number | null>(1)
  const [showMember, setShowMember] = useState<boolean>(false)
  const [editingPlan, setEditingPlan] = useState<number | null>()
  const navigation = useNavigate()
  const params = useParams()

  useLayoutEffect(() => {
    getTrip(params.id)
  }, [])

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

  const handleUpdatePlan = async (id: number, old: number, value: string) => {
    const res = await updatePlan(id, old, value, trip.id)
    if (res) await getTrip(params.id)
    setEditingPlan(null)
  }

  const handleDeletePlan = async (id: number) => {
    const res = await deletePlan(id)
    if (res) getTrip(params.id)
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

      {trip && <TripOutline trip={trip} />}

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
                    onClick={() => handleDeletePlan(plan.id)}
                  />
                )}
              </div>
              <SpotList plan={plan} getTrip={getTrip} />
            </div>
          )
        })}

        {user && (
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
        )}
      </div>
    </div>
  )
}

export default TripDetail
