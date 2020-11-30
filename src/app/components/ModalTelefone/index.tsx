import React, { ChangeEvent, useState } from 'react'
import { Button, Col, Form, Modal } from 'react-bootstrap'
import { Telefone } from '../../../domain/clientes/models'

interface ModalTelefoneProps {
  show?: boolean
  handleSubmit(telefone: Telefone): void;
  handleCancelarButton: () => void
}

const initialState: Telefone = {
  ddd: '',
  e_whatsapp: 'n',
  numero: '',
  ramal: ''
}

export const ModalTelefone = ({ show, handleSubmit, handleCancelarButton }: ModalTelefoneProps) => {
  const [telefone, setTelefone] = useState(initialState)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTelefone(telefone => {
      const newTelefone = { ...telefone, [e.target.name]: e.target.value }
      return newTelefone
    })
  }

  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro Telefone</Modal.Title>
      </Modal.Header>
      <Form onSubmit={() => handleSubmit(telefone)}>
        <Modal.Body>
          <Form.Row>
            <Form.Group as={Col} md={12}>
              <Form.Label>DDD</Form.Label>
              <Form.Control
                id="ddd"
                name="ddd"
                placeholder="DDD"
                type="text"
                isInvalid={false}
                value={telefone.ddd}
                onChange={handleOnChange}
              />
              <Form.Control.Feedback type="invalid" tooltip>
        erro
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={12}>
              <Form.Label>Número</Form.Label>
              <Form.Control
                id="numero"
                name="numero"
                placeholder="Número"
                type="text"
                isInvalid={false}
                value={telefone.numero}
                onChange={handleOnChange}
              />
              <Form.Control.Feedback type="invalid" tooltip>
        erro
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md={3}>
              <Form.Label>Ramal</Form.Label>
              <Form.Control
                id="ramal"
                name="ramal"
                type="text"
                isInvalid={false}
                value={telefone.ramal}
                onChange={handleOnChange}
                placeholder="Ramal"
              >
              </Form.Control>
              <Form.Control.Feedback type="invalid" tooltip>
            erro
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelarButton}>
    Cancelar
          </Button>
          <Button type="submit" variant="primary">
    Adicionar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
