import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createBrand } from '../../http/deviceAPI';

const CreateBrand = ({ show, handleClose }) => {

  const [value, setValue] = useState('')

  const addBrand = () => {
    createBrand({ name: value })
      .then(data => {
        setValue('') // clear input
        handleClose() // close modal
      })
      .catch(e => {
        setValue('') // clear input
        handleClose() // close modal
        console.log(e.response.data.message)
      })
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size='lg'
    >
      <Modal.Header closeButton>
        <Modal.Title>Добавить бренд</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            placeholder='Введите назнвание типа'
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-danger" onClick={handleClose}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addBrand}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateBrand;