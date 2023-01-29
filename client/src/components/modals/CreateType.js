import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createType } from '../../http/deviceAPI';

const CreateType = ({ show, handleClose }) => {

  const [value, setValue] = useState('')

  const addType = () => {
    createType({ name: value })
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
        <Modal.Title>Добавить тип</Modal.Title>
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
        <Button variant="outline-success" onClick={addType}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateType;