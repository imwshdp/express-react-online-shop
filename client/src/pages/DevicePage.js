import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';

const DevicePage = () => {

  const [device, setDevice] = useState({ info: [] })

  // get queryparams
  const { id } = useParams()

  useEffect(() => {
    fetchOneDevice(id)
      .then(data => setDevice(data))
      .catch(e => console.log(e.response.data.message))
  }, [])

  return (
    <>
      <Container className='d-flex flex-row flex-wrap mt-3'>

        <Col md={4} className={'d-flex flex-column'} style={{ alignItems: 'center' }}>
          <Image
            width={300}
            height={300}
            src={device.img ? process.env.REACT_APP_API_URL + device.img : ''}
            className='d-flex'
          />
        </Col>

        <Col md={4} className={'d-flex flex-column'} style={{ alignItems: 'center' }}>
          <Row className='d-flex flex-column'>

            <div className='d-flex justify-content-center'>
              <h2>{device.name}</h2>
            </div>

            <div className='d-flex justify-content-center' style={{ fontSize: 64 }}>
              {device.rating}✩
            </div>

          </Row>
        </Col>

        <Col md={4} className={'d-flex flex-column'} style={{ alignItems: 'center' }}>
          <Card
            className='d-flex flex-column align-items-center justify-content-around'
            style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
          >

            <h3>От: {device.price} у.е.</h3>
            <Button
              variant='outline-dark'
              style={{ cursor: 'pointer' }}
            >
              Добавить в корзину
            </Button>

          </Card>
        </Col>

      </Container>

      <Container className='d-flex flex-column mt-3 m-6'>
        <h1>Характеристики</h1>
        {device.info.map((info, index) =>
          <Row
            key={info.id}
            style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}
          >
            {info.title}: {info.description}
          </Row>
        )}
      </Container>
    </>
  );
}

export default DevicePage;