/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react'
import capitalize from 'capitalize-pt-br'
import { FaAt } from 'react-icons/fa'
import InputMask from 'react-input-mask'
import { useFormik } from 'formik'
import { Form, Col, Button, InputGroup, Nav, Tab, Row, Card } from 'react-bootstrap'
import EstadosMunicipios from '../../assets/jsons/estados_municipios.json'
import { Cliente } from '../../../domain/clientes/models/cliente'
import useClientes from '../../hooks/useClientes'
import { getIEMask } from '../../../helpers/getIEMask'
import { makeTrazerEnderecoCep } from '../../../domain/clientes/factories/makeTrazerEnderecoCep'
import { makeTrazerDadosCNPJ } from '../../../domain/clientes/factories/makeTrazerDadosCNPJ'
import { removerAcento } from '../../../helpers/removerAcentos'
import { TableContatos } from '../../components/TableContatos'
import { Layout } from '../Layout'

const trazerEnderecoPorCep = makeTrazerEnderecoCep()
const trazerDadosCNPJ = makeTrazerDadosCNPJ()

/* interface FormNovoClienteProps {
  afterSave: () => void
}
 */
/* export const FormCliente = ({ afterSave }: FormNovoClienteProps) => { */
export const CadastroCliente = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({} as any)
  const { add: addCliente } = useClientes()
  const [cidades, setCidades] = useState([] as string[])
  const [uf, setUF] = useState('')
  const [pessoa, setPessoa] = useState('pj')
  const [ieMask, setIeMask] = useState('')

  useEffect(() => {
    if (!uf) {
      return
    }

    const [estado] = EstadosMunicipios.estados.filter(estado => estado.sigla === uf)
    setCidades(estado.cidades)
    const ieMask = getIEMask(uf)
    setIeMask(ieMask)
  }, [uf])

  const sanetizeCliente = useCallback((values: any): Cliente => {
    const cliente: Cliente = {
      razao_social: values.razao_social,
      nome_fantasia: values.nome_fantasia,
      email: values.email,
      email_nfe: values.email_nfe,
      email_nfe2: values.email_nfe2,
      cnpj: values.cnpj.replace(/[^\w\s]/gi, '').replace(/_/g, ''),
      ie: values.ie.replace(/[^\w\s]/gi, '').replace(/_/g, ''),
      cep: values.cep.replace(/[^\w\s]/gi, '').replace(/_/g, ''),
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
  }, [])

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
      complemento: '',
      regiao: '',
      uf: '',
      is_cliente_final: false,
      is_orgao_estadual: false,
      is_revenda: false,
      is_isento: false,
      contatos: []
    },
    onSubmit: async (values) => {
      setLoading(true)
      const { error: addClienteError, loading, data } = await addCliente(sanetizeCliente(values))

      /* if (data.id) {
        afterSave()
      }
 */
      addClienteError && setErrors(addClienteError)
      setLoading(loading)
    }
  })

  const submitForm = useCallback((e: any) => {
    e.preventDefault()
    formik.handleSubmit()
  }, [formik])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    setErrors((errors: any) => {
      delete (errors[e.target.name])
      return errors
    })

    formik.handleChange(e)
  }, [formik])

  const handleUfInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUF(e.target.value)
    handleInputChange(e)
  }, [handleInputChange])

  const handleCepInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e)
    const cep = e.currentTarget.value.replace(/[^\w\s]/gi, '').replace(/_/g, '')
    if (cep.length === 8) {
      const response = await trazerEnderecoPorCep.execute(cep)
      if (!response.data.erro) {
        const [estado] = EstadosMunicipios.estados.filter(estado => estado.sigla === response.data.uf)
        setCidades(estado.cidades)

        setErrors((err: any) => {
          const newErrors = delete (err.cep)
          return newErrors
        })

        formik.setValues((v) => {
          const newValues = {
            ...v,
            ...{
              endereco: response.data.logradouro,
              uf: response.data.uf,
              cidade: response.data.localidade,
              bairro: response.data.bairro
            }
          }
          return newValues
        })
      }
    }
  }

  const handleInputCNPJ = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e)
    let cidade = ''
    const cnpj = e.currentTarget.value.replace(/[^\w\s]/gi, '').replace(/_/g, '')
    if (cnpj.length === 14) {
      const response = await trazerDadosCNPJ.execute('bf2cc265e3073aab06df3484f56f603e7c409b55e01cddc0bfde6781624c8494', cnpj)

      console.log(response)

      if (response.data) {
        const [estado] = EstadosMunicipios.estados.filter(estado => estado.sigla === response.data.uf)

        if (estado) {
          setCidades(estado.cidades)

          const filtered: string[] = estado.cidades.filter(cidade => {
            return removerAcento(cidade).toLowerCase() === removerAcento(response.data.municipio).toLowerCase()
          })

          if (filtered[0]) {
            cidade = filtered[0]
          }
        }

        formik.setValues(v => {
          const newValues = {
            ...v,
            ...{
              endereco: capitalize(response.data.logradouro),
              numero: response.data.numero,
              uf: response.data.uf,
              cidade,
              bairro: capitalize(response.data.bairro),
              cep: response.data.cep,
              email: response.data.email,
              razao_social: capitalize(response.data.nome),
              nome_fantasia: capitalize(response.data.fantasia)
            }
          }
          return newValues
        })
      }
    }
  }

  const handleChangeIsIsento = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e)
  }

  return (
    <Layout title="Dashboard">
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
                  </Nav>
                </Col>

                <Col sm={12}>
                  <Tab.Content>

                    <Tab.Pane eventKey="dados">
                      <Form.Row>
                        <Col>
                          <Form.Label>Tipo do Cliente</Form.Label>
                          <Form.Row>
                            <Col>
                              <Form.Check
                                type="radio"
                                label="Pessoa Física"
                                id="pf"
                                name="pf"
                                value="pf"
                                onChange={() => setPessoa('pf')}
                                checked={pessoa === 'pf'}
                              />
                            </Col>
                            <Col>
                              <Form.Check
                                type="radio"
                                label="Pessoa Jurídica"
                                id="pj"
                                name="pj"
                                value="pj"
                                onChange={() => setPessoa('pj')}
                                checked={pessoa === 'pj'}
                              />
                            </Col>
                          </Form.Row>
                        </Col>

                        <Col lg="7">
                          <Form.Label>Grupo</Form.Label>
                          <Form.Row>
                            <Col lg="2">
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
                            <Col lg="2">
                              <Form.Check
                                id="is_isento"
                                name="is_isento"
                                type="checkbox"
                                label="Isento"
                                defaultChecked={ false }
                                onChange={handleChangeIsIsento}
                                checked={formik.values.is_isento}
                                isInvalid={!!errors.is_isento}
                              />

                              <Form.Control.Feedback type="invalid" tooltip>
                                {errors?.is_isento}
                              </Form.Control.Feedback>
                            </Col >
                            <Col lg="4">
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
                            <Col lg="4">
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
                        </Col>
                      </Form.Row>

                      <hr/>

                      <Form.Row>
                        <Form.Group as={Col} md={6}>
                          <Form.Label>{pessoa === 'pj' ? 'CNPJ' : 'CPF'}</Form.Label>
                          <Form.Control
                            placeholder={pessoa === 'pj' ? 'CNPJ' : 'CPF'}
                            id="cnpj"
                            name="cnpj"
                            type="text"
                            onChange={handleInputCNPJ}
                            value={formik.values.cnpj}
                            isInvalid={!!errors.cnpj}
                            as={InputMask}
                            mask={pessoa === 'pj' ? '99.999.999/9999-99' : '999.999.999-99'}
                          />
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors?.cnpj}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6}>
                          <Form.Label>IE</Form.Label>
                          <Form.Control
                            placeholder={formik.values.is_isento ? 'isento' : 'IE'}
                            id="ie"
                            name="ie"
                            type="text"
                            onChange={handleInputChange}
                            value={formik.values.ie}
                            isInvalid={!!errors.ie}
                            as={InputMask}
                            mask={ieMask}
                            disabled={formik.values.is_isento}
                          />
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors?.ie}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col} md={6}>
                          <Form.Label>Razão Social</Form.Label>
                          <Form.Control
                            id="razao_social"
                            name="razao_social"
                            // placeholder="Razão Social"
                            type="text"
                            onChange={handleInputChange}
                            value={formik.values.razao_social}
                            isInvalid={!!errors.razao_social}
                          />
                          <Form.Control.Feedback type="invalid" tooltip>
                            { errors?.razao_social}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6}>
                          <Form.Label>Nome Fantasia</Form.Label>
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
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Col>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text><FaAt /></InputGroup.Text>
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
                            <InputGroup.Prepend>
                              <InputGroup.Text><FaAt /></InputGroup.Text>
                            </InputGroup.Prepend>
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
                              <InputGroup.Text><FaAt /></InputGroup.Text>
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

                    </Tab.Pane>

                    <Tab.Pane eventKey="endereco">
                      <Form.Row>
                        <Form.Group as={Col} md={2}>
                          <Form.Label>C.E.P.</Form.Label>
                          <Form.Control
                            placeholder="CEP"
                            id="cep"
                            name="cep"
                            type="text"
                            onChange={handleCepInputChange}
                            value={formik.values.cep}
                            isInvalid={!!errors.cep}
                            as={InputMask}
                            mask="99999-999"
                          />
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors?.cep}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md={7}>
                          <Form.Label>Endereço</Form.Label>
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
                        </Form.Group>

                        <Form.Group as={Col}>
                          <Form.Label>Número</Form.Label>
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
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col} md={2}>
                          <Form.Label>Estado</Form.Label>
                          <Form.Control
                            id="uf"
                            name="uf"
                            as="select"
                            type="text"
                            onChange={handleUfInputChange}
                            value={formik.values.uf}
                            isInvalid={!!errors.uf}
                          >
                            <option selected value="default"></option>
                            { EstadosMunicipios.estados.map(estado => <option key={estado.sigla} value={estado.sigla}>{estado.sigla}</option>)}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors?.uf}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md={4}>
                          <Form.Label>Cidade</Form.Label>
                          <Form.Control
                            id="cidade"
                            name="cidade"
                            as="select"
                            // size="sm"
                            type="text"
                            onChange={handleInputChange}
                            value={formik.values.cidade}
                            isInvalid={!!errors.cidade}
                          >
                            <option selected value="default">Escolha cidade</option>
                            { cidades.map(cidade => <option key={cidade} value={cidade}>{cidade}</option>)}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors?.cidade}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} >
                          <Form.Label>Bairro</Form.Label>
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
                        </Form.Group>

                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col} md={7}>
                          <Form.Label>Complemento</Form.Label>
                          <Form.Control
                            placeholder=""
                            id="complemento"
                            name="complemento"
                            type="text"
                            onChange={handleInputChange}
                            value={formik.values.complemento}
                            isInvalid={!!errors.complemento}
                          />
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors?.regiao}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md={5}>
                          <Form.Label>Região</Form.Label>
                          <Form.Control
                            placeholder="informe uma região"
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
                        </Form.Group>
                      </Form.Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="contatos">
                      <TableContatos cliente={formik.values as unknown as Cliente}/>
                      <Button disabled={loading} variant="primary" type="submit" className="float-right">
                   Salvar
                      </Button>
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
