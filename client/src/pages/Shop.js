import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import TypeBar from '../components/TypeBar';
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { fetchType, fetchBrand, fetchDevice } from '../http/deviceAPI';
import Pages from '../components/Pages';

const Shop = observer(() => {

  const { device } = useContext(Context)

  useEffect(() => {
    fetchType()
      .then(data => device.setTypes(data))
      .catch(e => console.log(e.response.data.message))

    fetchBrand()
      .then(data => device.setBrands(data))
      .catch(e => console.log(e.response.data.message))

    fetchDevice(null, null, 1, 3)
      .then(data => {
        device.setDevices(data.rows)
        device.setTotalCount(data.count)
      })
      .catch(e => console.log(e.response.data.message))
  }, [])


  useEffect(() => {
    fetchDevice(device.selectedType.id, device.selectedBrand.id, device.page, 3)
      .then(data => {
        device.setDevices(data.rows)
        device.setTotalCount(data.count)
      })
      .catch(e => console.log(e.response.data.message))
  }, [device.page, device.selectedType, device.selectedBrand])

  return (
    <Container>
      <Row className='mt-3'>

        <Col md={3}>
          <TypeBar />
        </Col>

        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>

      </Row>
    </Container>
  );
})

export default Shop;