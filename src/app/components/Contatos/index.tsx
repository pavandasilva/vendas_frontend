import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Card, Col, InputGroup, Row } from 'react-bootstrap'
import { FaSearch, FaWhatsapp } from 'react-icons/fa'
import { ModalTelefone } from '..'
import { Cliente, Contato, Telefone } from '../../../domain/clientes/models'
import { ModalContato } from '../ModalContato'

interface TableContatosProps {
  cliente: Cliente
}

export const Contatos = ({ cliente }: TableContatosProps) => {
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

  const editarContatoClick = () => {
    setShowModalContato(true)
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
                <th className="text-center">Telefone</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>

              { contatos?.map((contato, index) => (
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
        handleSubmit={handleSubmitContato}
        handleCancelar={() => setShowModalContato(false)}
        afterSubmit={() => setShowModalContato(false)}
      />

      <ModalTelefone
        show={showModalTelefone}
        handleSubmit={handleSubmitTelefone}
        handleCancelar={() => setShowModalTelefone(false)}
        afterSubmit={() => setShowModalTelefone(false)}/>
    </>
  )
}
