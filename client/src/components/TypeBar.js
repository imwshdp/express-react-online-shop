import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite'
import { ListGroup } from 'react-bootstrap';
import { Context } from '..';

const TypeBar = observer(() => {

  const { device } = useContext(Context)

  return (
    <ListGroup>
      {device.types.map(type =>
        <ListGroup.Item
          key={type.id}
          // variant="dark"
          onClick={() => device.setSelectedType(type)}
          active={type.id === device.selectedType.id}
          style={{ cursor: 'pointer' }}
          id="TypeItem"
        >
          {type.name}
        </ListGroup.Item>
      )}
    </ListGroup>
  );
})

export default TypeBar;