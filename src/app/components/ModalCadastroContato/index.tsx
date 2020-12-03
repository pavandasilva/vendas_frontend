import React, { ChangeEvent, useCallback, useState } from 'react'
import produce from 'immer'
import { Button, Col, Form, Modal } from 'react-bootstrap'
import { Contato } from '../../../domain/clientes/models'
import { useClienteDataCadastro } from '../../hooks/contexts'

interface ModalCadastroContatoProps {
  show?: boolean
  handleCancelar(): void
  afterAdicionarClick(): void
}

const initialState: Contato = {
  nome: '',
  email: '',
  comercial: 'n',
  fiscal: 'n',
  financeiro: 'n',
  status: 'ativo'
}

export const ModalCadastroContato = ({ show, handleCancelar, afterAdicionarClick }: ModalCadastroContatoProps) => {
  const [, setCliente] = useClienteDataCadastro()
  const [contato, setContato] = useState(initialState)

  const resetForm = useCallback(() => {
    setContato(initialState)
  }, [])

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    setContato(contato => {
      if (e.target.type === 'checkbox') {
        value = e.target.checked ? 's' : 'n'
      }

      const newContato = {
        ...contato,
        [e.target.name]: value
      }

      return newContato
    })
  }, [])

  const adicionarClick = useCallback(() => {
    setCliente(cliente => {
      const newState = produce(cliente, draftState => {
        draftState?.data.contatos?.push(contato)
      })

      return newState
    })
    resetForm()
    afterAdicionarClick()
  }, [afterAdicionarClick, contato, resetForm, setCliente])

  const handleCancelarClick = useCallback(() => {
    // limpa o formulário
    handleCancelar()
    resetForm()
  }, [handleCancelar, resetForm])

  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro contato</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Row>
            <Form.Group as={Col} md={12}>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                id="nome"
                name="nome"
                placeholder="Nome"
                type="text"
                isInvalid={false}
                value={contato.nome}
                onChange={handleOnChange}
              />
              <Form.Control.Feedback type="invalid" tooltip>
        erro
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={12}>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                id="email"
                name="email"
                placeholder="E-mail"
                type="email"
                isInvalid={false}
                value={contato.email}
                onChange={handleOnChange}
              />
              <Form.Control.Feedback type="invalid" tooltip>
        erro
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md={3}>
              <Form.Label>Status</Form.Label>
              <Form.Control
                id="status"
                name="status"
                type="text"
                isInvalid={false}
                as="select"
                value={contato.status}
                onChange={handleOnChange}
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>)
              </Form.Control>
              <Form.Control.Feedback type="invalid" tooltip>
            erro
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Col md="3">
              <Form.Check
                type="checkbox"
                label="Fiscal"
                id="fiscal"
                name="fiscal"
                defaultChecked={ false }
                checked={contato.fiscal === 's'}
                onChange={handleOnChange}
              />
            </Col>
            <Col md="3">
              <Form.Check
                type="checkbox"
                label="Comercial"
                id="comercial"
                name="comercial"
                defaultChecked={ false }
                checked={contato.comercial === 's'}
                onChange={handleOnChange}
              />
            </Col >
            <Col md="3">
              <Form.Check
                type="checkbox"
                label="Financeiro"
                id="financeiro"
                name="financeiro"
                defaultChecked={ false }
                checked={contato.financeiro === 's'}
                onChange={handleOnChange}
              />
            </Col >
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelarClick}>
            Cancelar
          </Button>
          <Button type="button" variant="primary" onClick={adicionarClick}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
