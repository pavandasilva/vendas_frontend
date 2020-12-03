import React, { useState, useCallback } from 'react'
import { Table, Form, Button, Card, Col, InputGroup, Row } from 'react-bootstrap'
import { FaSearch, FaWhatsapp } from 'react-icons/fa'
import { ModalCadastroContato, ModalCadastroTelefone } from '..'
import { useClienteDataCadastro } from '../../hooks/contexts/clienteDataCadastroContext'

export const Contatos = () => {
  const [cliente] = useClienteDataCadastro()
  const [indexContatoSelected, setIndexContatoSelected] = useState(-1)
  const [showModalCadastroContato, setShowModalCadastroContato] = useState(false)
  const [showModalCadastroTelefone, setShowModalCadastroTelefone] = useState(false)
  const [filter, setFilter] = useState('')

  console.log(cliente)

  const novoContatoOnClick = useCallback(() => {
    setShowModalCadastroContato(true)
  }, [])

  const handleAddTelefoneOnClick = useCallback((index: number) => {
    setIndexContatoSelected(index)
    setShowModalCadastroTelefone(true)
  }, [])

  const editarContatoClick = useCallback(() => {
    setShowModalCadastroContato(true)
  }, [])

  const searchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const filterContatos = useCallback(() => {
    if (filter === '') {
      return cliente.data?.contatos
    }

    return cliente.data?.contatos?.filter(contato => {
      if (contato?.email?.includes(filter)) {
        return true
      }

      if (contato?.nome?.includes(filter)) {
        return true
      }
    })
  }, [cliente.data.contatos, filter])

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
          {!cliente.data.contatos?.length ? <span>Este cliente não possui contatos</span> : (
            <>
              <Row>
                <Col md={4}>
                  <InputGroup className="mb-3" onChange={searchInputChange}>
                    <InputGroup.Prepend >
                      <InputGroup.Text id="inputGroup-sizing-sm"><FaSearch/></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control as="input" />
                  </InputGroup>
                </Col>
              </Row>

              { !filterContatos()?.length ? <span>Nenhum contato encontrado com estes filtros </span>
                : (<Table bordered striped hover size="sm">
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

                    { filterContatos()?.map((contato, index) => (
                      <>
                        <tr key={index.toString()}>
                          <td className="align-middle">{contato.nome}</td>
                          <td className="align-middle">{contato.email}</td>
                          <td className="text-center align-middle">{contato.status}</td>
                          <td className="text-center align-middle">{contato.comercial === 's' ? 'Sim' : 'Não'}</td>
                          <td className="text-center align-middle">{contato.fiscal === 's' ? 'Sim' : 'Não'}</td>
                          <td className="text-center align-middle">{contato.financeiro === 's' ? 'Sim' : 'Não'}</td>
                          <td className="text-center align-middle">
                            <Button variant="link" onClick={() => handleAddTelefoneOnClick(index)}>Adicionar</Button>
                          </td>
                          <td className="text-center align-middle">
                            <Button variant="link" onClick={editarContatoClick}>Editar</Button>
                          </td>
                        </tr>
                        {contato?.telefones && <tr>
                          <td id={`accordion${index.toString()}`} className="collapse" colSpan={7}>
                            { contato?.telefones?.map((telefone, index) => <div key={index.toString()}> {`(${telefone.ddd}) ${telefone.numero}`} {telefone.whatsapp === 's' && <FaWhatsapp/>}</div>) }
                          </td>
                        </tr>}
                      </>
                    ))}
                  </tbody>
                </Table>)
              }
            </>)}
        </Card.Body>
      </Card>

      <ModalCadastroContato
        show={showModalCadastroContato}
        handleCancelar={() => setShowModalCadastroContato(false)}
        afterAdicionarClick={() => setShowModalCadastroContato(false)}
      />

      <ModalCadastroTelefone
        show={showModalCadastroTelefone}
        indexContato={indexContatoSelected}
        handleCancelar={() => setShowModalCadastroTelefone(false)}
        afterAdicionarClick={() => setShowModalCadastroTelefone(false)}/>
    </>
  )
}
