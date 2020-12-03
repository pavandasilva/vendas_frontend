import React, { useCallback, FormEvent } from 'react'
import { produce } from 'immer'
import { Form, Col, Button, Nav, Tab, Row, Card } from 'react-bootstrap'
import { Cliente } from '../../../domain/clientes/models/cliente'
import { Contatos, Dados, Endereco } from '../../components'
import { Layout } from '../Layout'

import './styles.scss'
import { makeCadastrarCliente } from '../../../domain/clientes/factories/makeCadastrarCliente'
import { useClienteDataCadastro } from '../../hooks/contexts'

const cadastrarCliente = makeCadastrarCliente()

export const CadastroCliente = () => {
  const [dataFormCliente, setDataFormCliente] = useClienteDataCadastro()

  const sanetizeCliente = useCallback((values: any): Cliente => {
    const cliente: Cliente = {
      razao_social: values.razao_social,
      nome_fantasia: values.nome_fantasia,
      email: values.email,
      email_nfe: values.email_nfe,
      email_nfe2: values.email_nfe2,
      cnpj: values.cnpj?.replace(/[^\w\s]/gi, '').replace(/_/g, ''),
      ie: values.ie?.replace(/[^\w\s]/gi, '').replace(/_/g, ''),
      cep: values.cep?.replace(/[^\w\s]/gi, '').replace(/_/g, ''),
      endereco: values.endereco,
      numero: values.numero,
      bairro: values.bairro,
      cidade: values.cidade,
      regiao: values.regiao,
      uf: values.uf,
      is_cliente_final: values.is_cliente_final,
      is_orgao_estadual: values.is_orgao_estadual,
      is_revenda: values.is_orgao_estadual,
      contatos: values.contatos
    }

    return cliente
  }, [])

  const submitForm = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    try {
      await cadastrarCliente.execute({
        body: sanetizeCliente(dataFormCliente.data)
      })
    } catch (error) {
      const newState = produce(dataFormCliente, draftState => {
        draftState.error = error.data
      })

      setDataFormCliente(newState)
    }
  }, [dataFormCliente, sanetizeCliente, setDataFormCliente])

  return (
    <Layout title="Cadastro de cliente">
      <Card>
        <Card.Body>
          <Form noValidate onSubmit={submitForm} >
            <Tab.Container defaultActiveKey="dados">
              <Row>
                <Col sm={12} className="mb-4 border-bottom pb-3 pt-3 bg-light" style={{ marginTop: '-16px' }}>
                  <Nav variant="pills">
                    <Nav.Item>
                      <Nav.Link eventKey="dados">Dados</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="endereco">Endereço</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="contatos">Contatos</Nav.Link>
                    </Nav.Item>
                    <div className="wrapper-button-salvar">
                      <Button type="submit" >Salvar</Button>
                    </div>
                  </Nav>
                </Col>

                <Col sm={12}>
                  <Tab.Content>
                    <Tab.Pane eventKey="dados">
                      <Dados />
                    </Tab.Pane>
                    <Tab.Pane eventKey="endereco">
                      <Endereco />
                    </Tab.Pane>
                    <Tab.Pane eventKey="contatos">
                      <Contatos/>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
            <br />
          </Form>
        </Card.Body>
      </Card>
    </Layout>
  )
}
