import React from 'react';
import { observer } from 'mobx-react-lite'
import { Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../utils/consts';

const DeviceItem = observer(({ device }) => {

  const navigate = useNavigate()

  return (
    <Col md={3}
      className='mt-3'
      onClick={() => navigate(RouteNames.DEVICE_ROUTE + '/' + device.id)}
    >
      <Card
        style={{ width: '150', cursor: 'pointer' }}
        border={"light"}
      >
        <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
        <div className='text-black-50 d-flex justify-content-between mt-2'>

          <div>Some Info</div>

          <div className='d-flex align-items-center'>
            <span>5</span>
            <div style={{ width: '20', height: '20' }}>✩</div>
          </div>

        </div>

        <div style={{ fontWeight: 'bold' }}>{device.name}</div>
      </Card>
    </Col>
  );
})

export default DeviceItem;