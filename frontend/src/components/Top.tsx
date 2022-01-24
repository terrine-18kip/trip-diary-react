import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button, Row, Col, Card } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import '../Top.css'

const Top: React.FC = () => {
  const [trips, setTrips] = useState<any>([])

  useEffect(() => {
    getTrips()
  }, [])

  async function getTrips() {
    try {
      const res = await axios.get('http://localhost/api/trips')
      setTrips(res.data)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  
  async function deleteTrip(id: number) {
    try {
      await axios.delete(`http://localhost/api/trips/${id}`)
      alert('削除しました')
      return getTrips()
    } catch (error) {
      console.log(error)
    }
  }

  function edit(): void {
    console.log('edit')
  }

  return (
    <div className="container">
      <h2>☆旅のしおりを作ろう☆</h2>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/new">
          <Button type="primary">新しい旅</Button>
        </Link>
      </div>

      <Row gutter={16}>
        {trips.map((trip: any) => {
          return (
            <Col key={trip.id} xs={24} sm={12} md={8} lg={6} style={{marginBottom: '10px'}}>
              {/* <Link to='/'> */}
              <Card
                title={trip.title}
                // hoverable
                bordered={false}
                actions={[
                  <EditOutlined key="edit" onClick={edit} />,
                  <DeleteOutlined key="delete" onClick={() => {deleteTrip(trip.id)}} />,
                ]}
              >
                <p>
                  {trip.start_date} ～ {trip.end_date}
                </p>
                <p>メモ：{trip.memo}</p>
              </Card>
              {/* </Link> */}
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default Top
