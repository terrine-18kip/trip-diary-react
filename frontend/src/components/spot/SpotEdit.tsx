import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Form, Input, Select, InputNumber, Radio, Space } from 'antd'
const { Option } = Select
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import SpotCategory from './SpotCategory'
import { InputSpot } from '../../types/Types'
import { categories } from '../../data/SpotData'
import { useUpdateSpot } from '../../hooks/spot/useUpdateSpot'
import { useDeleteSpot } from '../../hooks/spot/useDeleteSpot'

type Props = {
  spot: InputSpot
  getTrip: (id: string | undefined) => Promise<void>
  setFlag: React.Dispatch<React.SetStateAction<boolean>>
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>
}

const SpotEdit: React.FC<Props> = ({ spot, getTrip, setFlag, setShowDetail }) => {
  const { updateSpot } = useUpdateSpot()
  const { deleteSpot } = useDeleteSpot()
  const [data, setData] = useState<InputSpot>(spot)
  const params = useParams()

  const handleSubmitUpdate = async () => {
    const res = await updateSpot(spot.id, data)
    if (res) {
      await getTrip(params.id)
      setFlag(false)
      setShowDetail(false)
    }
  }

  const handleSubmitDelete = async () => {
    const res = await deleteSpot(spot.id)
    if (res) {
      await getTrip(params.id)
      setFlag(false)
      setShowDetail(false)
    }
  }

  const styles = {
    wrapper: css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 1000;
    `,
    form: css`
      width: 90%;
      max-width: 500px;
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 5px;
      text-align: center;
      background-color: #fafafa;
    `,
    radioGroup: css`
      max-width: 240px;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
    `,
    radio: css`
      .ant-radio {
        display: none;
      }
      &.ant-radio-wrapper {
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  }

  return (
    <div css={styles.wrapper}>
      <Form onFinish={handleSubmitUpdate} css={styles.form}>
        <div style={{ marginBottom: '10px' }}>
          <Input
            autoFocus
            placeholder='スポット名'
            value={data.name}
            style={{ width: '100%' }}
            onChange={(event) => setData({ ...data, name: event.target.value })}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <Input
            type='time'
            placeholder='開始時間'
            value={data.start_time ? data.start_time : undefined}
            onChange={(event) => setData({ ...data, start_time: event.target.value })}
          />
          <span style={{ padding: '0 5px' }}>～</span>
          <Input
            type='time'
            placeholder='終了時間'
            value={data.end_time ? data.end_time : undefined}
            onChange={(event) => setData({ ...data, end_time: event.target.value })}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <Radio.Group
            css={styles.radioGroup}
            onChange={(event) => setData({ ...data, category_id: event.target.value })}
          >
            {categories.map((category, i) => (
              <Radio css={styles.radio} type='circle' key={i} value={i}>
                <SpotCategory id={i} active={data.category_id === i} hoverable />
              </Radio>
            ))}
          </Radio.Group>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <InputNumber
            placeholder='金額'
            value={data.fee ?? undefined}
            style={{ width: '100%' }}
            addonAfter='円'
            formatter={(value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            onChange={(event) => setData({ ...data, fee: Number(event) })}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <Input
            placeholder='リンク'
            value={data.link ?? undefined}
            onChange={(event) => setData({ ...data, link: event.target.value })}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Input
            placeholder='メモ'
            value={data.memo ?? undefined}
            onChange={(event) => setData({ ...data, memo: event.target.value })}
          />
        </div>

        <Space>
          <Button shape='round' htmlType='submit' type='primary'>
            更新
          </Button>
          <Button shape='round' onClick={() => setFlag(false)}>
            キャンセル
          </Button>
          <Button shape='round' danger onClick={handleSubmitDelete}>
            削除
          </Button>
        </Space>
      </Form>
    </div>
  )
}

export default SpotEdit
