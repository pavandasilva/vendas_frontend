import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Col, Form, Modal } from 'react-bootstrap'
import InputMask from 'react-input-mask'
import { Telefone } from '../../../domain/clientes/models'

interface ModalTelefoneProps {
  show?: boolean;
  handleSubmit(telefone: Telefone): void;
  handleCancelar(): void;
  afterSubmit(): void
}

const initialState: Telefone = {
  ddd: '',
  e_whatsapp: 'n',
  numero: '',
  ramal: ''
}

export const ModalTelefone = ({ show, handleSubmit, handleCancelar, afterSubmit }: ModalTelefoneProps) => {
  const [telefone, setTelefone] = useState(initialState)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    setTelefone(telefone => {
      if (e.target.type === 'checkbox') {
        const checkbox = telefone[e.target.name as keyof Telefone]

        if (checkbox && checkbox === 's') {
          value = 'n'
        } else {
          value = 's'
        }
      }

      const newContato = {
        ...telefone,
        [e.target.name]: value
      }

      return newContato
    })
  }

  const formHandleSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleSubmit(telefone)
    setTelefone(initialState)
    afterSubmit()
  }

  const handleCancelarClick = () => {
    setTelefone(initialState)
    handleCancelar()
  }

  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro Telefone</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formHandleSubmit}>
        <Modal.Body>
          <Form.Row>
            <Form.Group as={Col} md={2}>
              <Form.Label>DDD</Form.Label>
              <Form.Control
                id="ddd"
                name="ddd"
                placeholder="DDD"
                type="text"
                isInvalid={false}
                value={telefone.ddd}
                as={InputMask}
                onChange={handleOnChange}
                mask={'99'}
              />
              <Form.Control.Feedback type="invalid" tooltip>
        erro
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={10}>
              <Form.Label>Número</Form.Label>
              <Form.Control
                id="numero"
                name="numero"
                placeholder="Número"
                isInvalid={false}
                value={telefone.numero}
                onChange={handleOnChange}
                type="text"
                as={InputMask}
                mask={'9999999999'}
              />
              <Form.Control.Feedback type="invalid" tooltip>
        erro
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md={2}>
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
            <Col md="3">
              <Form.Check
                type="checkbox"
                label="Whatsapp"
                id="e_whatsapp"
                name="e_whatsapp"
                defaultChecked={ false }
                checked={telefone.e_whatsapp === 's'}
                onChange={handleOnChange}
              />
            </Col >
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelarClick}>
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
