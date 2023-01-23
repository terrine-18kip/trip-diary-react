import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, Radio } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { styles } from './styles'
/** @jsxImportSource @emotion/react */

import CategoryIcon from '../../elements/CategoryIcon/index'
import { InputPlace } from '../../../types/Types'
import { categories } from '../../../data/SpotData'
import { useAddPlace } from './hooks'

type Props = {
  tripId: number
  getTrip: () => Promise<void>
  setFlag: React.Dispatch<React.SetStateAction<boolean>>
}

const PlaceCreate: React.FC<Props> = ({ tripId, getTrip, setFlag }) => {
  const { addPlace } = useAddPlace()

  const [data, setData] = useState<InputPlace>({
    trip_id: tripId,
    category_id: 0,
  })

  const handleSubmit = async () => {
    const res = await addPlace(data)
    if (res) {
      await getTrip()
      setFlag(false)
    }
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
      </Form>
    </>
  )
}

export default PlaceCreate
