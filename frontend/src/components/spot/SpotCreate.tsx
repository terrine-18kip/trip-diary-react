import React, { useContext, useState } from 'react'
import { Button, Form, Input, InputNumber, Radio } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import SpotCategory from './SpotCategory'
import { InputSpot, Plan } from 'types/Types'
import { categories } from 'data/SpotData'
import { useAddSpot } from 'hooks/spot/useAddSpot'
import { TripContext } from 'Context'

type Props = {
  plan: Plan
  setFlag: React.Dispatch<React.SetStateAction<boolean>>
}

const SpotCreate: React.FC<Props> = ({ plan, setFlag }) => {
  const { addSpot } = useAddSpot()
  const spotOrder: number | undefined = plan.spots[plan.spots.length - 1]?.order + 1

  const { getTrip } = useContext(TripContext)
  const [data, setData] = useState<InputSpot>({
    plan_id: plan.id,
    category_id: 0,
    order: spotOrder || 0,
  })

  const handleSubmit = async () => {
    const res = await addSpot(data)
    if (res) {
      await getTrip()
      setFlag(false)
    }
  }

  const styles = {
    button: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    `,
    radioGroup: css`
      max-width: 360px;
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
        width: 16%;
        margin: 0 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
    icon: css`
      width: 36px;
      height: 36px;
    `,
  }

  return (
    <>
      <Form onFinish={handleSubmit}>
        <div css={styles.button}>
          <Button
            type='text'
            shape='circle'
            icon={<PlusOutlined rotate={45} />}
            onClick={() => setFlag(false)}
          />
          <Button shape='round' htmlType='submit' type='primary'>
            登録
          </Button>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <Input
            autoFocus
            placeholder='スポット名'
            onChange={(event) => setData({ ...data, name: event.target.value })}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
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

        <div style={{ marginBottom: '5px' }}>
          <Radio.Group
            css={styles.radioGroup}
            onChange={(event) => setData({ ...data, category_id: event.target.value })}
          >
            {categories.map((category) => (
              <Radio css={styles.radio} type='circle' key={category.id} value={category.id}>
                <div css={styles.icon}>
                  <SpotCategory
                    id={category.id}
                    active={data.category_id === category.id}
                    hoverable
                  />
                </div>
              </Radio>
            ))}
          </Radio.Group>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <InputNumber
            placeholder='金額'
            addonAfter='円'
            formatter={(value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
      </Form>
    </>
  )
}

export default SpotCreate
