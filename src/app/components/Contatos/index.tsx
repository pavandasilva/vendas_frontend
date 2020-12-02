import React, { useState, useCallback } from 'react'
import { Table, Form, Button, Card, Col, InputGroup, Row } from 'react-bootstrap'
import { FaSearch, FaWhatsapp } from 'react-icons/fa'
import { ModalTelefone } from '..'
import { useClienteDataCadastro } from '../../hooks/contexts/clienteDataCadastroContext'
import { ModalContato } from '../ModalContato'

export const Contatos = () => {
  const [cliente] = useClienteDataCadastro()
  const [indexContatoSelected, setIndexContatoSelected] = useState(-1)
  const [showModalContato, setShowModalContato] = useState(false)
  const [showModalTelefone, setShowModalTelefone] = useState(false)

  const novoContatoOnClick = useCallback(() => {
    setShowModalContato(true)
  }, [])

  const handleAddTelefoneOnClick = useCallback((index: number) => {
    setIndexContatoSelected(index)
    setShowModalTelefone(true)
  }, [])

  const editarContatoClick = useCallback(() => {
    setShowModalContato(true)
  }, [])

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
                <Form.Control as="input" />
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
                <th className="text-center">Telefone</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>

              { cliente.contatos?.map((contato, index) => (
                <>
                  <tr key={index.toString()}>
                    <td className="align-middle">{contato.nome}</td>
                    <td className="align-middle">{contato.email}</td>
                    <td className="align-middle">{contato.status}</td>
                    <td className="text-center align-middle">{contato.e_comercial === 's' ? 'Sim' : 'Não'}</td>
                    <td className="text-center align-middle">{contato.e_fiscal === 's' ? 'Sim' : 'Não'}</td>
                    <td className="text-center align-middle">{contato.e_financeiro === 's' ? 'Sim' : 'Não'}</td>
                    <td className="text-center align-middle">
                      <Button variant="link" onClick={() => handleAddTelefoneOnClick(index)}>Adicionar</Button>
                    </td>
                    <td className="text-center align-middle">
                      <Button variant="link" onClick={editarContatoClick}>Editar</Button>
                    </td>
                  </tr>
                  {contato?.telefones && <tr>
                    <td id={`accordion${index.toString()}`} className="collapse" colSpan={7}>
                      { contato?.telefones?.map((telefone, index) => <div key={index.toString()}> {`(${telefone.ddd}) ${telefone.numero}`} {telefone.e_whatsapp === 's' && <FaWhatsapp/>}</div>) }
                    </td>
                  </tr>}
                </>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <ModalContato
        show={showModalContato}
        handleCancelar={() => setShowModalContato(false)}
        afterAdicionarClick={() => setShowModalContato(false)}
      />

      <ModalTelefone
        show={showModalTelefone}
        indexContato={indexContatoSelected}
        handleCancelar={() => setShowModalTelefone(false)}
        afterAdicionarClick={() => setShowModalTelefone(false)}/>
    </>
  )
}
