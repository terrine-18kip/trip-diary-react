import React, { useEffect, useLayoutEffect, useState, useContext } from 'react'
import { UserContext } from '../../Context'
import { useNavigate, useParams } from 'react-router-dom'
import TripMember from '../TripMember'
import { styles } from '../../styles/TripDetail.styles'
import { PageHeader, Button, Form, InputNumber } from 'antd'
import { PlusCircleFilled, InfoCircleOutlined } from '@ant-design/icons'
import { Plan } from '../../types/Types'
import { useGetTrip } from '../../hooks/trip/useGetTrip'
import { useAddPlan } from '../../hooks/plan/useAddPlan'
import TripOutline from '../templates/TripOutline'
import PlanOutline from '../templates/PlanOutline'
import SpotList from '../SpotList'
/** @jsxImportSource @emotion/react */

const TripDetail: React.FC = () => {
  const { user } = useContext(UserContext)
  const { trip, plans, unauthorized, getTrip } = useGetTrip()
  const { addPlan } = useAddPlan()

  const [planNum, setPlanNum] = useState<number | null>(1)
  const [showMember, setShowMember] = useState<boolean>(false)
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

      <TripOutline trip={trip} />

      <div css={styles.plans}>
        {plans?.map((plan: Plan) => {
          return (
            <>
              <PlanOutline tripId={trip.id} plan={plan} getTrip={getTrip} />
              <SpotList plan={plan} getTrip={getTrip} />
            </>
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
