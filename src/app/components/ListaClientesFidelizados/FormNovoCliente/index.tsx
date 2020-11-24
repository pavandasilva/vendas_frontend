import React, { useState } from 'react'
import InputMask from 'react-input-mask'
import { useFormik } from 'formik'
import { Form, Col, Button, InputGroup } from 'react-bootstrap'
import { Cliente } from '../../../../domain/clientes/models/cliente'
import useClientes from '../../../hooks/useClientes'

export const FormNovoCliente = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({} as any)
  const { add: addCliente } = useClientes()

  const sanetizeCliente = (values: any): Cliente => {
    const cliente: Cliente = {
      razao_social: values.razao_social,
      nome_fantasia: values.nome_fantasia,
      email: values.email,
      email_nfe: values.email_nfe,
      email_nfe2: values.email_nfe2,
      cnpj: values.cnpj.replace(/[^\w\s]/gi, ''),
      ie: values.ie.replace(/[^\w\s]/gi, ''),
      cep: values.cep.replace(/[^\w\s]/gi, ''),
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

    return cliente
  }

  const formik = useFormik({
    initialValues: {
      razao_social: '',
      nome_fantasia: '',
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
    onSubmit: async (values) => {
      const { error: addClienteError, loading } = await addCliente(sanetizeCliente(values))
      setLoading(loading)
      addClienteError && setErrors(addClienteError)
    }
  })

  const submitForm = (e: any) => {
    e.preventDefault()
    formik.handleSubmit()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    setErrors((errors: any) => {
      delete (errors[e.target.name])
      return errors
    })

    formik.handleChange(e)
  }

  return (
    <Form noValidate onSubmit={submitForm} >
      <Form.Row>
        <Col>
          <Form.Control
            id="razao_social"
            name="razao_social"
            placeholder="Razão Social"
            type="text"
            onChange={handleInputChange}
            value={formik.values.razao_social}
            isInvalid={!!errors.razao_social}
          />

          <Form.Control.Feedback type="invalid" tooltip>
            { errors?.razao_social}
          </Form.Control.Feedback>
        </Col>
        <Col>
          <Form.Control
            placeholder="Nome Fantasia"
            id="nome_fantasia"
            name="nome_fantasia"
            type="text"
            onChange={handleInputChange}
            value={formik.values.nome_fantasia}
            isInvalid={!!errors.nome_fantasia}
          />

          <Form.Control.Feedback type="invalid" tooltip>
            {errors?.nome_fantasia}
          </Form.Control.Feedback>
        </Col>
      </Form.Row>
      <br />
      <Form.Row>
        <Col>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>@</InputGroup.Text>
            </InputGroup.Prepend>

            <Form.Control
              placeholder="Email"
              id="email"
              name="email"
              type="email"
              onChange={handleInputChange}
              value={formik.values.email}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors?.email}
            </Form.Control.Feedback>
          </InputGroup>

        </Col>
        <Col>
          <InputGroup>
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              placeholder="Email Nota Fiscal"
              id="email_nfe"
              name="email_nfe"
              type="email"
              onChange={handleInputChange}
              value={formik.values.email_nfe}
              isInvalid={!!errors.email_nfe}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors?.email_nfe2}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>@</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              placeholder="Email Nota Fiscal 2"
              id="email_nfe2"
              name="email_nfe2"
              type="email"
              onChange={handleInputChange}
              value={formik.values.email_nfe2}
              isInvalid={!!errors.email_nfe2}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors?.email_nfe2}
            </Form.Control.Feedback>
          </InputGroup>
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
            onChange={handleInputChange}
            value={formik.values.cnpj}
            isInvalid={!!errors.cnpj}
            as={InputMask}
            mask='99.999.999/9999-99'
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {errors?.cnpj}
          </Form.Control.Feedback>
        </Col>
        <Col>
          <Form.Control
            placeholder="IE"
            id="ie"
            name="ie"
            type="text"
            onChange={handleInputChange}
            value={formik.values.ie}
            isInvalid={!!errors.ie}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {errors?.ie}
          </Form.Control.Feedback>
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
            onChange={handleInputChange}
            value={formik.values.cep}
            isInvalid={!!errors.cep}
            as={InputMask}
            mask="99999-999"
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {errors?.cep}
          </Form.Control.Feedback>
        </Col>
        <Col sm="8" lg="8">
          <Form.Control
            placeholder="Endereço"
            id="endereco"
            name="endereco"
            type="text"
            onChange={handleInputChange}
            value={formik.values.endereco}
            isInvalid={!!errors.endereco}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {errors?.endereco}
          </Form.Control.Feedback>
        </Col>
        <Col sm="2" lg="2">
          <Form.Control
            placeholder="Número"
            id="numero"
            name="numero"
            type="text"
            onChange={handleInputChange}
            value={formik.values.numero}
            isInvalid={!!errors.numero}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {errors?.numero}
          </Form.Control.Feedback>
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
            onChange={handleInputChange}
            value={formik.values.bairro}
            isInvalid={!!errors.bairro}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {errors?.bairro}
          </Form.Control.Feedback>
        </Col>
        <Col sm="3" lg="3">
          <Form.Control
            placeholder="Cidade"
            id="cidade"
            name="cidade"
            type="text"
            onChange={handleInputChange}
            value={formik.values.cidade}
            isInvalid={!!errors.cidade}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {errors?.cidade}
          </Form.Control.Feedback>
        </Col>
        <Col sm="4" lg="4">
          <Form.Control
            placeholder="Região"
            id="regiao"
            name="regiao"
            type="text"
            onChange={handleInputChange}
            value={formik.values.regiao}
            isInvalid={!!errors.regiao}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {errors?.regiao}
          </Form.Control.Feedback>
        </Col>
        <Col sm="2" lg="2">
          <Form.Control
            id="uf"
            name="uf"
            as="select"
            size="sm"
            type="text"
            onChange={handleInputChange}
            value={formik.values.uf}
            isInvalid={!!errors.uf}
          >
            <option selected>PA</option>
            <option>SP</option>
            <option>PA</option>
            <option>SP</option>
            <option>PA</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid" tooltip>
            {errors?.uf}
          </Form.Control.Feedback>
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
            onChange={handleInputChange}
            checked={formik.values.is_cliente_final}
            isInvalid={!!errors.is_cliente_final}
          />

          <Form.Control.Feedback type="invalid" tooltip>
            {errors?.is_cliente_final}
          </Form.Control.Feedback>
        </Col >
        <Col sm="3" lg="3">
          <Form.Check
            type="checkbox"
            label="Órgão Estadual"
            id="is_orgao_estadual"
            name="is_orgao_estadual"
            defaultChecked={ false }
            onChange={handleInputChange}
            checked={formik.values.is_orgao_estadual}
            isInvalid={!!errors.is_orgao_estadual}
          />

          <Form.Control.Feedback type="invalid" tooltip>
            {errors?.is_orgao_estadual}
          </Form.Control.Feedback>
        </Col>
        <Col sm="3" lg="3">
          <Form.Check
            type="checkbox"
            label="Revenda"
            id="is_revenda"
            name="is_revenda"
            defaultChecked={ false }
            onChange={handleInputChange}
            checked={formik.values.is_revenda}
            isInvalid={!!errors.is_revenda}
          />

          <Form.Control.Feedback type="invalid" tooltip>
            {errors?.is_revenda}
          </Form.Control.Feedback>
        </Col>
      </Form.Row>
      <Button disabled={loading} variant="primary" type="submit" className="float-right">
        Salvar
      </Button>
    </Form>
  )
}
