import React, { useContext } from 'react'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import { TripContext, UserContext } from '../../Context'
import PlanOutline from '../plan/PlanOutline'
import PlanCreate from '../plan/PlanCreate'
import SpotList from '../spot/SpotList'
import NotFound from '../common/NotFound'

const PlanList: React.FC = () => {
  const { user } = useContext(UserContext)
  const { trip, plans, unauthorized } = useContext(TripContext)

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
          <div key={plan.id}>
            <PlanOutline tripId={trip.id} plan={plan} />
            <SpotList plan={plan} />
          </div>
        )
      })}

      {user && <PlanCreate />}
    </div>
  )
}

export default PlanList
