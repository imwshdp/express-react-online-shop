import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite'
import { Card, Row } from 'react-bootstrap';
import { Context } from '..';

const BrandBar = observer(() => {

  const { device } = useContext(Context)

  return (
    <Row className='d-flex flex-row flex-wrap'>
      {device.brands.map(brand =>
        <Card
          key={brand.id}
          className="p-2"
          onClick={() => device.setSelectedBrand(brand)}
          border={brand.id === device.selectedBrand.id ? 'dark' : 'light'}
          style={{ cursor: 'pointer', width: 'fit-content', minWidth: '80px', textAlign: 'center' }}
        >
          {brand.name}
        </Card>
      )}
    </Row>
  );
})

export default BrandBar;