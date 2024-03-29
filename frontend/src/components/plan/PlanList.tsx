import React, { useContext } from 'react'

import { TripContext, UserContext } from 'Context'
import PlanOutline from 'components/plan/PlanOutline'
import PlanCreate from 'components/plan/PlanCreate'
import SpotList from 'components/spot/SpotList'
import NotFound from 'components/common/NotFound'

const PlanList: React.FC = () => {
  const { user } = useContext(UserContext)
  const { trip, plans, unauthorized } = useContext(TripContext)

  if (unauthorized) return <NotFound />
  if (!trip) return <></>

  return (
    <>
      {plans?.map((plan) => {
        return (
          <div key={plan.id}>
            <PlanOutline tripId={trip.id} plan={plan} />
            <SpotList plan={plan} />
          </div>
        )
      })}

      {user && <PlanCreate />}
    </>
  )
}

export default PlanList
