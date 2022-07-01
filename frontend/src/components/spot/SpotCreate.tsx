import React, { useState } from 'react'
import { Button, Form, Input, Select, InputNumber, Space } from 'antd'
const { Option } = Select
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { InputSpot, Plan } from '../../types/Types'
import { categories } from '../../data/SpotData'
import { useAddSpot } from '../../hooks/spot/useAddSpot'
import { useParams } from 'react-router-dom'

type Props = {
  plan: Plan
  getTrip: (id: string | undefined) => Promise<void>
  setFlag: React.Dispatch<React.SetStateAction<boolean>>
}

const SpotCreate: React.FC<Props> = ({ plan, getTrip, setFlag }) => {
  const { addSpot } = useAddSpot()
  const spotOrder: number | undefined = plan.spots[plan.spots.length - 1]?.order + 1
  const params = useParams()

  const [data, setData] = useState<InputSpot>({
    plan_id: plan.id,
    category_id: 0,
    order: spotOrder || 0,
  })

  const handleSubmit = async () => {
    const res = await addSpot(data)
    if (res) {
      await getTrip(params.id)
      setFlag(false)
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
  }

  return (
    <div css={styles.wrapper}>
      <Form onFinish={handleSubmit} css={styles.form}>
        <div style={{ marginBottom: '10px' }}>
          <Input
            autoFocus
            placeholder='スポット名'
            onChange={(event) => setData({ ...data, name: event.target.value })}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <Input
            type='time'
            placeholder='開始時間'
            onChange={(event) => setData({ ...data, start_time: event.target.value })}
          />
          <span style={{ padding: '0 5px' }}>～</span>
          <Input
            type='time'
            placeholder='終了時間'
            onChange={(event) => setData({ ...data, end_time: event.target.value })}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <Select
            placeholder='カテゴリーを選択'
            style={{ width: '100%', textAlign: 'left' }}
            onChange={(event) => setData({ ...data, category_id: event })}
          >
            {categories.map((category, i) => (
              <Option key={i} value={i}>
                {category}
              </Option>
            ))}
          </Select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <InputNumber
            placeholder='金額'
            addonAfter='円'
            style={{ width: '100%' }}
            onChange={(event) => setData({ ...data, fee: Number(event) })}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <Input
            placeholder='リンク'
            onChange={(event) => setData({ ...data, link: event.target.value })}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Input
            placeholder='メモ'
            onChange={(event) => setData({ ...data, memo: event.target.value })}
          />
        </div>

        <Space>
          <Button shape='round' htmlType='submit' type='primary'>
            登録
          </Button>
          <Button shape='round' onClick={() => setFlag(false)}>
            キャンセル
          </Button>{' '}
        </Space>
      </Form>
    </div>
  )
}

export default SpotCreate
