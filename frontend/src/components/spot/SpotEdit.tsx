import React, { useContext, useState } from 'react'
import { Button, Form, Input, InputNumber, Radio } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import SpotCategory from './SpotCategory'
import { InputSpot } from '../../types/Types'
import { categories } from '../../data/SpotData'
import { useUpdateSpot } from '../../hooks/spot/useUpdateSpot'
import { TripContext } from '../../Context'

type Props = {
  spot: InputSpot
  setFlag: React.Dispatch<React.SetStateAction<boolean>>
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>
}

const SpotEdit: React.FC<Props> = ({ spot, setFlag, setShowDetail }) => {
  const { updateSpot } = useUpdateSpot()
  const { getTrip } = useContext(TripContext)
  const [data, setData] = useState<InputSpot>(spot)

  const handleSubmitUpdate = async () => {
    const res = await updateSpot(spot.id, data)
    if (res) {
      await getTrip()
      setFlag(false)
      setShowDetail(false)
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
      <Form onFinish={handleSubmitUpdate}>
        <div css={styles.button}>
          <Button
            type='text'
            shape='circle'
            icon={<PlusOutlined rotate={45} />}
            onClick={() => setFlag(false)}
          />
          <Button shape='round' htmlType='submit' type='primary'>
            更新
          </Button>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <Input
            autoFocus
            placeholder='スポット名'
            value={data.name}
            style={{ width: '100%' }}
            onChange={(event) => setData({ ...data, name: event.target.value })}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
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
      </Form>
    </>
  )
}

export default SpotEdit
