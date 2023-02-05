import React, { useContext } from 'react'
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

import { TripContext } from 'Context'
import TripOutline from 'components/trip/TripOutline'
import NotFound from 'components/common/NotFound'

const TripDetail: React.FC = () => {
  const { trip, unauthorized } = useContext(TripContext)

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
      <TripOutline />

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
