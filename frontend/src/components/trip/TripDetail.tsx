import React, { useLayoutEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import {
  CarryOutOutlined,
  PushpinOutlined,
  NodeIndexOutlined,
  ShoppingOutlined,
  TransactionOutlined,
} from '@ant-design/icons'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import { UserContext } from '../../Context'
import { useGetTrip } from '../../hooks/trip/useGetTrip'
import TripOutline from '../trip/TripOutline'
import NotFound from '../common/NotFound'

const TripDetail: React.FC = () => {
  const { user } = useContext(UserContext)
  const { trip, unauthorized, getTrip } = useGetTrip()

  useLayoutEffect(() => {
    getTrip()
  }, [user])

  const styles = {
    services: css`
      padding: 20px 10px;
      display: grid;
      grid-gap: 10px;
    `,
    button: css`
      height: 50px;
      padding-left: 10%;
      border-radius: 10px;
      color: #666;
      font-size: 15px;
      text-align: left;
    `,
  }

  if (unauthorized) return <NotFound />
  if (!trip) return <></>

  return (
    <>
      <TripOutline trip={trip} getTrip={getTrip} />

      <div css={styles.services}>
        <Button block disabled icon={<CarryOutOutlined />} css={styles.button}>
          日程調整
        </Button>

        <Link to={`/${trip.uniqid}/place`}>
          <Button block icon={<PushpinOutlined />} css={styles.button}>
            行き先メモ
          </Button>
        </Link>

        <Link to={`/${trip.uniqid}/plan`}>
          <Button block icon={<NodeIndexOutlined />} css={styles.button}>
            旅のプラン
          </Button>
        </Link>

        <Button block disabled icon={<ShoppingOutlined />} css={styles.button}>
          持ち物リスト
        </Button>

        <Button block disabled icon={<TransactionOutlined />} css={styles.button}>
          割り勘計算
        </Button>
      </div>
    </>
  )
}

export default TripDetail
