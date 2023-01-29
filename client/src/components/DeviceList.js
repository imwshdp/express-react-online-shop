import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite'
import { Row } from 'react-bootstrap';
import { Context } from '..';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {

  const { device } = useContext(Context)

  return (
    <Row
      className='d-flex flex-row flex-wrap mt-4'
    >
      {device.devices.map(device =>
        <DeviceItem
          key={device.id}
          device={device}
        />
      )}
    </Row>
  );
})

export default DeviceList;