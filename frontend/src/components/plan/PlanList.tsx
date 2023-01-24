import React, { useLayoutEffect, useContext } from 'react'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import { UserContext } from '../../Context'
import { useGetTrip } from '../../hooks/trip/useGetTrip'
import PlanOutline from '../plan/PlanOutline'
import PlanCreate from '../plan/PlanCreate'
import SpotList from '../spot/SpotList'
import NotFound from '../common/NotFound'

const PlanList: React.FC = () => {
  const { user } = useContext(UserContext)
  const { trip, plans, unauthorized, getTrip } = useGetTrip()

  useLayoutEffect(() => {
    getTrip()
  }, [user])

  const styles = {
    plans: css`
      padding: 20px 10px;
      @media screen and (max-width: 768px) {
        padding: 15px 1%;
      }
    `,
  }

  if (unauthorized) return <NotFound />
  if (!trip) return <></>

  return (
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
  )
}

export default PlanList
