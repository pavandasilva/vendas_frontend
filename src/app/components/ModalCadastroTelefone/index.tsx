import React, { ChangeEvent, useCallback, useState } from 'react'
import produce from 'immer'
import { Button, Col, Form, Modal } from 'react-bootstrap'
import InputMask from 'react-input-mask'
import { Telefone } from '../../../domain/clientes/models'
import { useClienteDataCadastro } from '../../hooks/contexts'

interface ModalCadastroTelefoneProps {
  show?: boolean;
  handleCancelar(): void;
  afterAdicionarClick(): void;
  indexContato: number
}

const initialState: Telefone = {
  ddd: '',
  e_whatsapp: 'n',
  numero: '',
  ramal: ''
}

export const ModalCadastroTelefone = ({ show, handleCancelar, afterAdicionarClick, indexContato }: ModalCadastroTelefoneProps) => {
  const [telefone, setTelefone] = useState(initialState)
  const [, setCliente] = useClienteDataCadastro()

  const resetForm = useCallback(() => {
    setTelefone(initialState)
  }, [])

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    if (e.target.type === 'checkbox') {
      value = e.target.checked ? 's' : 'n'
    }

    setTelefone(telefone => {
      const newContato = {
        ...telefone,
        [e.target.name]: value
      }

      return newContato
    })
  }, [])

  const handleSubmit = useCallback(() => {
    setCliente(cliente => {
      const newState = produce(cliente, draftState => {
        if (!draftState?.contatos?.length) {
          return cliente
        }

        draftState?.contatos[indexContato]?.telefones?.push(telefone)
      })

      return newState
    })

    setTelefone(initialState)
    resetForm()
    afterAdicionarClick()
  }, [afterAdicionarClick, indexContato, resetForm, setCliente, telefone])

  const handleCancelarClick = useCallback(() => {
    setTelefone(initialState)
    resetForm()
    handleCancelar()
  }, [handleCancelar, resetForm])

  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro Telefone</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
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
          <Button type="button" variant="primary" onClick={handleSubmit}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
