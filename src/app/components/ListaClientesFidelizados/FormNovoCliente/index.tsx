import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Form, Col, Button } from 'react-bootstrap'
import { Cliente } from '../../../../domain/clientes/models/cliente'

export const FormNovoCliente = () => {
  const [cliente, setCliente] = useState({} as Cliente)

  const sanetizeCliente = (values: any): Cliente => {
    return {
      razao_social: values.razao,
      nome_fantasia: values.fantasia,
      email: values.email,
      email_nfe: values.email_nfe,
      email_nfe2: values.email_nfe2,
      cnpj: values.cnpj,
      ie: values.ie,
      cep: values.cep,
      endereco: values.endereco,
      numero: values.numero,
      bairro: values.bairro,
      cidade: values.cidade,
      regiao: values.regiao,
      uf: values.uf,
      is_cliente_final: values.is_cliente_final ? 's' : 'n',
      is_orgao_estadual: values.is_orgao_estadual ? 's' : 'n',
      is_revenda: values.is_orgao_estadual ? 's' : 'n'
    }
  }

  const formik = useFormik({
    initialValues: {
      razao: '',
      fantasia: '',
      email: '',
      email_nfe: '',
      email_nfe2: '',
      cnpj: '',
      ie: '',
      cep: '',
      endereco: '',
      numero: '',
      bairro: '',
      cidade: '',
      regiao: '',
      uf: '',
      is_cliente_final: false,
      is_orgao_estadual: false,
      is_revenda: false

    },

    /* validate, */
    onSubmit: values => {
      setCliente(sanetizeCliente(values))
    }
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Row>
        <Col>
          <Form.Control
            placeholder="Razão Social"
            id="razao"
            name="razao"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.razao}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Nome Fantasia"
            id="fantasia"
            name="fantasia"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.fantasia}
          />
        </Col>
      </Form.Row>
      <br />
      <Form.Row>
        <Col>
          <Form.Control
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Email Nota Fiscal"
            id="email_nfe"
            name="email_nfe"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email_nfe}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Email Nota Fiscal 2"
            id="email_nfe2"
            name="email_nfe2"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email_nfe2}
          />
        </Col>
      </Form.Row>
      <br />
      <Form.Row>
        <Col>
          <Form.Control
            placeholder="CNPJ"
            id="cnpj"
            name="cnpj"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.cnpj}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="IE"
            id="ie"
            name="ie"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.ie}
          />
        </Col>
      </Form.Row>
      <br />
      <Form.Row>
        <Col sm="2" lg="2">
          <Form.Control
            placeholder="CEP"
            id="cep"
            name="cep"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.cep}
          />
        </Col>
        <Col sm="8" lg="8">
          <Form.Control
            placeholder="Endereço"
            id="endereco"
            name="endereco"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.endereco}
          />
        </Col>
        <Col sm="2" lg="2">
          <Form.Control
            placeholder="Número"
            id="numbero"
            name="numero"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.numero}
          />
        </Col>
      </Form.Row>
      <br />
      <Form.Row>
        <Col sm="3" lg="3">
          <Form.Control
            placeholder="Bairro"
            id="bairro"
            name="bairro"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.bairro}
          />
        </Col>
        <Col sm="3" lg="3">
          <Form.Control
            placeholder="Cidade"
            id="cidade"
            name="cidade"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.cidade}
          />
        </Col>
        <Col sm="4" lg="4">
          <Form.Control
            placeholder="Região"
            id="regiao"
            name="regiao"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.regiao}
          />
        </Col>
        <Col sm="2" lg="2">
          <Form.Control
            id="uf"
            as="select"
            size="sm"
            name="uf"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.uf}
          >
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
          <Form.Check
            type="checkbox"
            label="Cliente final"
            id="is_cliente_final"
            name="is_cliente_final"
            defaultChecked={ false }
            onChange={formik.handleChange}
            checked={formik.values.is_cliente_final}
          />
        </Col >
        <Col sm="3" lg="3">
          <Form.Check
            type="checkbox"
            label="Órgão Estadual"
            id="is_orgao_estadual"
            name="is_orgao_estadual"
            defaultChecked={ false }
            onChange={formik.handleChange}
            checked={formik.values.is_orgao_estadual}
          />
        </Col>
        <Col sm="3" lg="3">
          <Form.Check
            type="checkbox"
            label="Revenda"
            id="is_revenda"
            name="is_revenda"
            defaultChecked={ false }
            onChange={formik.handleChange}
            checked={formik.values.is_revenda}
          />
        </Col>
      </Form.Row>
      <Button variant="primary" type="submit" className="float-right">
        Salvar
      </Button>
    </Form>
  )
}
