import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, Modal } from 'react-bootstrap';
import { Context } from '../..';
import { fetchType, fetchBrand, createDevice } from '../../http/deviceAPI';

const CreateDevice = observer(({ show, handleClose }) => {

  const { device } = useContext(Context)

  // inputs states
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)

  const [info, setInfo] = useState([])

  // row adding / removing functions
  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }

  // uploaded file handling
  const selectFile = e => {
    setFile(e.target.files[0])
  }

  // change info element by key (title / description)
  const changeInfo = (key, value, number) => {
    setInfo(info.map(i =>
      i.number === number
        ? { ...i, [key]: value }
        : i
    ))
  }

  // submitting function
  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))

    createDevice(formData)
      .then(data => handleClose())
      .catch(e => console.log(e.response.data.message))
  }

  // fetching data
  useEffect(() => {
    fetchType()
      .then(data => device.setTypes(data))
      .catch(e => console.log(e.response.data.message))

    fetchBrand()
      .then(data => device.setBrands(data))
      .catch(e => console.log(e.response.data.message))
  }, [])

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size='lg'
    >
      <Modal.Header closeButton>
        <Modal.Title>Добавить устройство</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

          {/* SELECTS */}

          <div style={{ display: 'flex', flexDirection: 'row' }}>

            <Dropdown className='mt-2 mb-2'>
              <Dropdown.Toggle>
                {device.selectedType.name || 'Выберите тип'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {device.types.map(type =>
                  <Dropdown.Item
                    key={type.id}
                    onClick={() => device.setSelectedType(type)}
                  >
                    {type.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className='mt-2 mb-2' style={{ marginLeft: 15 }}>
              <Dropdown.Toggle>
                {device.selectedBrand.name || 'Выберите бренд'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {device.brands.map(brand =>
                  <Dropdown.Item
                    key={brand.id}
                    onClick={() => device.setSelectedBrand(brand)}
                  >
                    {brand.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

          </div>

          {/* INPUTS */}

          <Form.Control
            placeholder='Введите название устройства'
            className='mt-2 mb-2'
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <Form.Control
            placeholder='Введите стоимость устройства'
            className='mt-2 mb-2'
            type='number'
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
          />

          <Form.Control
            className='mt-2 mb-2'
            type='file'
            onChange={selectFile}
          />

          <br />

          {/* ADD DEVICE PROPERTIES */}

          <Button
            variant='outline-dark'
            onClick={addInfo}
          >
            Добавить новое свойство
          </Button>

          {info.map(i =>
            <div
              className='mt-2 gx-5'
              style={{ display: 'flex', flexFlow: 'row nowrap' }}
              key={i.number}
            >
              <Col md={4} className='p-1'>
                <Form.Control
                  placeholder='Название свойства'
                  value={i.title}
                  onChange={e => changeInfo('title', e.target.value, i.number)}
                />
              </Col>

              <Col md={4} className='p-1'>
                <Form.Control
                  placeholder='Описание свойства'
                  value={i.description}
                  onChange={e => changeInfo('description', e.target.value, i.number)}
                />
              </Col>

              <Col md={4} className='p-1'>
                <Button
                  variant='outline-danger'
                  onClick={() => removeInfo(i.number)}
                >
                  Удалить свойство
                </Button>
              </Col>
            </div>
          )}

        </Form>
      </Modal.Body>

      {/* BUTTONS OF MODAL MANAGEMENT */}

      <Modal.Footer>
        <Button variant="outline-danger" onClick={handleClose}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
})

export default CreateDevice;