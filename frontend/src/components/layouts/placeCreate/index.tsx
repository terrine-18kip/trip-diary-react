import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, Radio, Space } from 'antd'
import { styles } from './styles'
/** @jsxImportSource @emotion/react */

import CategoryIcon from '../../elements/categoryIcon/index'
import { InputPlace } from '../../../types/Types'
import { categories } from '../../../data/SpotData'
import { useAddPlace } from './hooks'
import { useParams } from 'react-router-dom'

type Props = {
  tripId: number
  getTrip: (id: string | undefined) => Promise<void>
  setFlag: React.Dispatch<React.SetStateAction<boolean>>
}

const PlaceCreate: React.FC<Props> = ({ tripId, getTrip, setFlag }) => {
  const { addPlace } = useAddPlace()
  const params = useParams()

  const [data, setData] = useState<InputPlace>({
    trip_id: tripId,
    category_id: 0,
  })

  const handleSubmit = async () => {
    const res = await addPlace(data)
    if (res) {
      await getTrip(params.id)
      setFlag(false)
    }
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

        <div style={{ marginBottom: '5px' }}>
          <Radio.Group
            css={styles.radioGroup}
            onChange={(event) => setData({ ...data, category_id: event.target.value })}
          >
            {categories.map((category) => (
              <Radio css={styles.radio} type='circle' key={category.id} value={category.id}>
                <div css={styles.icon}>
                  <CategoryIcon
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

export default PlaceCreate
