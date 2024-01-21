import React, { useContext } from 'react'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import { TripContext } from 'Context'
import TripOutline from 'components/trip/TripOutline'
import PlanList from 'components/plan/PlanList'
import NotFound from 'components/common/NotFound'
import Loading from 'components/elements/Loading'

const TripDetail: React.FC = () => {
  const { trip, loading, unauthorized } = useContext(TripContext)

  const styles = {
    wrapper: css`
      padding: 20px 10px;
      @media screen and (max-width: 768px) {
        padding: 15px 1%;
      }
    `,
    space: css`
      height: 10px;
    `,
  }

  if (loading) return <Loading />
  if (unauthorized) return <NotFound />
  if (!trip) return <></>

  return (
    <div css={styles.wrapper}>
      <TripOutline />
      <div css={styles.space}></div>
      <PlanList />
    </div>
  )
}

export default TripDetail
