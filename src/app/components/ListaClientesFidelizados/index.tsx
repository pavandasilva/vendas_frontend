import capitalize from 'capitalize-pt-br'
import React, { useState, useCallback } from 'react'
import { Formik } from 'formik'
import { Table, Pagination, Form, InputGroup, Card, Row, Col, Button, Modal } from 'react-bootstrap'

import { Cliente } from '../../../domain/clientes/models/cliente'
import { Atendimento } from '../Atendimento'
import useClientesFidelizados from '../../hooks/useClientesFidelizados'
import { useTabs } from '../../hooks/contexts'
import { FaSearch } from 'react-icons/fa'
import { LoadingTable } from '../LoadingTable'

const perPage = 30

export const ListaClientesFidelizados = () => {
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { addTab } = useTabs()

  const { data: clientesFidelizados } = useClientesFidelizados({
    currentPage,
    perPage,
    search
  })

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }, [])

  const handleAtenderOnClick = useCallback((cliente: Cliente) => {
    if (!cliente?.id) {
      return
    }

    addTab({
      index: cliente.id as number,
      title: `${cliente.id} - ${cliente.nome_fantasia}`,
      content: <Atendimento cliente={cliente}/>
    })
  }, [addTab])

  const handlePaginationOnClick = useCallback((page: number) => {
    if (!clientesFidelizados?.metadata?.count) {
      return
    }

    if (page < 1 || page > Math.ceil(clientesFidelizados.metadata.count / perPage)) {
      return
    }

    setCurrentPage(page)
  }, [clientesFidelizados])

  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Prepend >
                  <InputGroup.Text id="inputGroup-sizing-sm"><FaSearch/></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="input" onChange={onChange}/>
              </InputGroup>
            </Col>
          </Row>

          <div className="title">
          Clientes
            <div className="float-right">
              <Button size="sm" variant="primary" onClick={() => setShowModal(true)}>Novo cliente</Button>
            </div>
          </div>

          { !clientesFidelizados?.data ? <LoadingTable /> : (
            <>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Razão</th>
                    <th>UF</th>
                    <th>Cidade</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  { clientesFidelizados?.data?.map(cliente => (
                    <tr key={cliente?.id?.toString()}>
                      <td>{cliente?.id}</td>
                      <td>{capitalize(cliente?.razao_social as string)}</td>
                      <td>{cliente?.uf?.toUpperCase()}</td>
                      <td>{capitalize(cliente?.cidade as string)}</td>
                      <td><Button size="sm" variant="link" onClick={() => handleAtenderOnClick(cliente)}>Atender</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {
                clientesFidelizados && clientesFidelizados.metadata?.count > perPage && (
                  <Pagination size="sm">
                    <Pagination.First onClick={() => handlePaginationOnClick(1)}/>
                    <Pagination.Prev onClick={() => handlePaginationOnClick(currentPage - 1)}/>

                    { Array.apply(0, Array(Math.ceil(clientesFidelizados.metadata.count / perPage))).map((_, i) =>
                      <Pagination.Item
                        active={currentPage === i + 1}
                        onClick={() => handlePaginationOnClick(i + 1)}
                        key={i.toString()}>
                        {i + 1}
                      </Pagination.Item>
                    )}
                    <Pagination.Next onClick={() => handlePaginationOnClick(currentPage + 1)}/>
                    <Pagination.Last onClick={() => handlePaginationOnClick(Math.ceil(clientesFidelizados.metadata.count / perPage))}/>
                  </Pagination>
                )
              }
            </>
          )}
        </Card.Body>
      </Card>

      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Cadastro de cliente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Col>
                <Form.Control placeholder="Razão Social" />
              </Col>
              <Col>
                <Form.Control placeholder="Nome Fantasia" />
              </Col>
            </Form.Row>
            <br />
            <Form.Row>
              <Col>
                <Form.Control placeholder="Email" />
              </Col>
              <Col>
                <Form.Control placeholder="Email Nota Fiscal" />
              </Col>
              <Col>
                <Form.Control placeholder="Email Nota Fiscal 2" />
              </Col>
            </Form.Row>
            <br />
            <Form.Row>
              <Col>
                <Form.Control placeholder="CNPJ" />
              </Col>
              <Col>
                <Form.Control placeholder="IE" />
              </Col>
            </Form.Row>
            <br />
            <Form.Row>
              <Col sm="2" lg="2">
                <Form.Control placeholder="CEP" />
              </Col>
              <Col sm="8" lg="8">
                <Form.Control placeholder="Endereço" />
              </Col>
              <Col sm="2" lg="2">
                <Form.Control placeholder="Número" />
              </Col>
            </Form.Row>
            <br />
            <Form.Row>
              <Col sm="3" lg="3">
                <Form.Control placeholder="Bairro" />
              </Col>
              <Col sm="3" lg="3">
                <Form.Control placeholder="Cidade" />
              </Col>
              <Col sm="4" lg="4">
                <Form.Control placeholder="Região" />
              </Col>
              <Col sm="2" lg="2">
                <Form.Control as="select" size="sm">
                  <option>SP</option>
                  <option>PA</option>
                  <option>SP</option>
                  <option>PA</option>
                  <option>SP</option>
                  <option>PA</option>
                </Form.Control>
              </Col>
            </Form.Row>
            <br />
            <Form.Row>
              <Col sm="3" lg="3">
                <Form.Check type="checkbox" label="Cliente final" />
              </Col >
              <Col sm="3" lg="3">
                <Form.Check type="checkbox" label="Órgão Estadual" />
              </Col>
              <Col sm="3" lg="3">
                <Form.Check type="checkbox" label="Revenda" />
              </Col>
            </Form.Row>
            <Button variant="primary" type="submit" className="float-right">
              Salvar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
