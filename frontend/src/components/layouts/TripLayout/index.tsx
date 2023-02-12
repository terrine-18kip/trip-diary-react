import React, { useContext, useEffect, useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Button } from 'antd'
import {
  ArrowLeftOutlined,
  ScheduleOutlined,
  PushpinOutlined,
  NodeIndexOutlined,
} from '@ant-design/icons'
import { styles } from './styles'
/** @jsxImportSource @emotion/react */

import { TripContext } from 'Context'

const TripLayout: React.FC = () => {
  const { trip, unauthorized } = useContext(TripContext)
  const [pageName, setPageName] = useState<string>('')
  const location = useLocation()

  useEffect(() => {
    const urlArray = location.pathname.split('/')
    setPageName(urlArray.slice(-1)[0])
  }, [location.pathname])

  if (unauthorized) return <></>
  if (!trip) return <></>

  const date = `${trip.start_date ?? ''}${trip.start_date && trip.end_date ? ' ～ ' : ''}${
    trip.end_date ?? ''
  }`

  return (
    <>
      <div css={styles.header}>
        <div css={styles.headerTitle}>
          <Link to={`/${trip.uniqid}`}>
            <Button type='text' shape='circle' icon={<ArrowLeftOutlined />} />
          </Link>
          <span>{trip.title}</span>
        </div>
        {date.length > 0 && (
          <div css={styles.headerDate}>
            <ScheduleOutlined /> {date}
          </div>
        )}
      </div>

      <div css={styles.main}>
        <Outlet />
      </div>

      <div css={styles.footer}>
        <Link
          to={`/${trip.uniqid}/place`}
          css={[styles.footerContent, pageName === 'place' && styles.active]}
        >
          <PushpinOutlined /> 行き先メモ
        </Link>

        <Link
          to={`/${trip.uniqid}/plan`}
          css={[styles.footerContent, pageName === 'plan' && styles.active]}
        >
          <NodeIndexOutlined /> 旅のプラン
        </Link>
      </div>
    </>
  )
}

export default TripLayout
