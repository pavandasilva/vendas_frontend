import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Card, Col, InputGroup, Row } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import { ModalTelefone } from '..'
import { Cliente, Contato, Telefone } from '../../../domain/clientes/models'
import { ModalContato } from '../ModalContato'

interface TableContatosProps {
  cliente: Cliente
}

export const TableContatos = ({ cliente }: TableContatosProps) => {
  const [contatos, setContatos] = useState([] as Contato[])
  const [indexContatoSelected, setIndexContatoSelected] = useState(-1)
  const [showModalContato, setShowModalContato] = useState(false)
  const [showModalTelefone, setShowModalTelefone] = useState(false)

  useEffect(() => {
    if (cliente?.contatos) {
      setContatos(cliente?.contatos)
    }
  }, [cliente])

  const handleFilterOnChange = () => {

  }

  const novoContatoOnClick = () => {
    setShowModalContato(true)
  }

  const handleSubmitContato = (contato: Contato) => {
    setContatos(contatos =>
      [...contatos, contato]
    )

    setShowModalContato(false)
  }

  const handleAddTelefoneOnClick = (index: number) => {
    setIndexContatoSelected(index)
    setShowModalTelefone(true)
  }

  const handleSubmitTelefone = (telefone: Telefone) => {
    const contatoSelected = contatos[indexContatoSelected]

    if (!contatoSelected.telefones?.length) {
      contatoSelected.telefones = [telefone]
    } else {
      contatoSelected?.telefones?.push(telefone)
    }

    setContatos(contatos => {
      contatos[indexContatoSelected] = contatoSelected
      return contatos
    })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <div className="title">
          Contatos
            <div className="float-right">
              <Button size="sm" variant="primary" onClick={novoContatoOnClick}>Novo contato</Button>
            </div>
          </div>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Prepend >
                  <InputGroup.Text id="inputGroup-sizing-sm"><FaSearch/></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="input" onChange={handleFilterOnChange}/>
              </InputGroup>
            </Col>
          </Row>

          <Table bordered hover size="sm">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-Mail</th>
                <th>Status</th>
                <th className="text-center">Comercial</th>
                <th className="text-center">Fiscal</th>
                <th className="text-center">Financeiro</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              { contatos?.map((contato, index) => (
                <tr key={index.toString()}>
                  <td>{contato.nome}</td>
                  <td>{contato.email}</td>
                  <td>{contato.status}</td>
                  <td>{contato.e_comercial === 's' ? 'Sim' : 'Não'}</td>
                  <td>{contato.e_fiscal === 's' ? 'Sim' : 'Não'}</td>
                  <td>{contato.e_financeiro === 's' ? 'Sim' : 'Não'}</td>

                  <td className="text-center align-middle">
                    <Button variant="Link">+</Button>
                    <Button variant="Link" onClick={() => handleAddTelefoneOnClick(index)}>+ Telefone</Button>
                    <Button variant="Link">Editar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <ModalContato show={showModalContato} handleSubmit={handleSubmitContato} handleCancelarButton={() => setShowModalContato(false)}/>
      <ModalTelefone show={showModalTelefone} handleSubmit={handleSubmitTelefone} handleCancelarButton={() => setShowModalTelefone(false)}/>
    </>
  )
}
