import React, { useLayoutEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader, Button } from 'antd'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import { UserContext } from '../../Context'
import { useGetTrip } from '../../hooks/trip/useGetTrip'
import TripMember from '../TripMember'
import TripOutline from '../templates/TripOutline'
import PlanOutline from '../templates/PlanOutline'
import PlanCreate from '../templates/PlanCreate'
import SpotList from '../SpotList'
import NotFound from '../views/NotFound'

const TripDetail: React.FC = () => {
  const { user } = useContext(UserContext)
  const { trip, plans, unauthorized, getTrip } = useGetTrip()

  const [showMember, setShowMember] = useState<boolean>(false)
  const navigation = useNavigate()
  const params = useParams()

  useLayoutEffect(() => {
    getTrip(params.id)
  }, [])

  const styles = {
    plans: css`
      padding: 20px 10px;
      @media screen and (max-width: 768px) {
        padding: 15px 1%;
      }
    `,
  }

  if (unauthorized) {
    return <NotFound />
  }

  return trip ? (
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
        {plans?.map((plan) => {
          return (
            <>
              <PlanOutline tripId={trip.id} plan={plan} getTrip={getTrip} />
              <SpotList plan={plan} getTrip={getTrip} />
            </>
          )
        })}

        {user && <PlanCreate trip={trip} plans={plans} getTrip={getTrip} />}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default TripDetail
