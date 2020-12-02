import React, { useState, useEffect, useCallback, FormEvent } from 'react'
import { FaAt } from 'react-icons/fa'
import InputMask from 'react-input-mask'
import { Form, Col, Button, InputGroup, Nav, Tab, Row, Card } from 'react-bootstrap'
import EstadosMunicipios from '../../assets/jsons/estados_municipios.json'
import { Cliente } from '../../../domain/clientes/models/cliente'
import { getIEMask } from '../../../helpers/getIEMask'
import { makeTrazerEnderecoCep } from '../../../domain/clientes/factories/makeTrazerEnderecoCep'
import { makeTrazerDadosCNPJ } from '../../../domain/clientes/factories/makeTrazerDadosCNPJ'
import { removerAcento } from '../../../helpers/removerAcentos'
import { Contatos } from '../../components'
import { Layout } from '../Layout'
import './styles.scss'
import { useClienteDataCadastro } from '../../hooks/contexts/clienteDataCadastroContext'

const trazerEnderecoPorCep = makeTrazerEnderecoCep()
const trazerDadosCNPJ = makeTrazerDadosCNPJ()

export const CadastroCliente = () => {
  const [controlFormIsIsento, setControlFormIsIsento] = useState(false)
  const [errors, setErrors] = useState({} as any)
  const [controlCidades, setControlCidades] = useState([] as string[])
  const [uf, setUF] = useState('')
  const [controlFormPessoa, setControlFormPessoa] = useState('pj')
  const [ieMask, setIeMask] = useState('')
  const [cliente, setCliente] = useClienteDataCadastro()

  useEffect(() => {
    if (!uf) {
      return
    }

    const [estado] = EstadosMunicipios.estados.filter(estado => estado.sigla === uf)
    setControlCidades(estado.cidades)
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
      is_cliente_final: values.is_cliente_final,
      is_orgao_estadual: values.is_orgao_estadual,
      is_revenda: values.is_orgao_estadual,
      contatos: values.contatos
    }

    return cliente
  }, [])

  const submitForm = useCallback((e: FormEvent) => {
    e.preventDefault()
    console.log('cadastroCliente', sanetizeCliente(cliente))
  }, [cliente, sanetizeCliente])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    if (e.target.type === 'checkbox') {
      value = e.target.checked ? 's' : 'n'
    }

    const newCliente = {
      ...cliente,
      [e.target.name]: value
    }

    setCliente(newCliente)

    // limpa o erro do input que está sendo editado
    setErrors((errors: any) => {
      delete (errors[e.target.name])
      return errors
    })
  }, [cliente, setCliente])

  const handleUfInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUF(e.target.value)
    handleInputChange(e)
  }, [handleInputChange])

  const handleCepInputChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e)

    const cep = e.currentTarget.value.replace(/[^\w\s]/gi, '').replace(/_/g, '')
    if (cep.length === 8) {
      const response = await trazerEnderecoPorCep.execute(cep)
      if (!response.data.erro) {
        const [estado] = EstadosMunicipios.estados.filter(estado => estado.sigla === response.data.uf)
        setControlCidades(estado.cidades)

        setErrors((err: any) => {
          const newErrors = delete (err.cep)
          return newErrors
        })

        const newValues = {
          ...cliente,
          ...{
            endereco: response.data.logradouro,
            uf: response.data.uf,
            cidade: response.data.localidade,
            bairro: response.data.bairro
          }
        }

        setCliente(newValues)
      }
    }
  }, [cliente, handleInputChange, setCliente])

  const handleInputCNPJ = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let cidade = ''
    const cnpj = e.currentTarget.value.replace(/[^\w\s]/gi, '').replace(/_/g, '')

    if (cnpj.length === 14) {
      const response = await trazerDadosCNPJ.execute('bf2cc265e3073aab06df3484f56f603e7c409b55e01cddc0bfde6781624c8494', cnpj)

      if (response.data) {
        const [estado] = EstadosMunicipios.estados.filter(estado => estado.sigla === response.data.uf)

        if (estado) {
          setControlCidades(estado.cidades)

          const filtered: string[] = estado.cidades.filter(cidade => {
            return removerAcento(cidade).toLowerCase() === removerAcento(response.data.municipio).toLowerCase()
          })

          if (filtered[0]) {
            cidade = filtered[0]
          }
        }
      }
    }

    handleInputChange(e)
  }

  const handleIsIsentoOnChange = useCallback(() => {
    setControlFormIsIsento(v => !v)
  }, [])

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
                                onChange={() => setControlFormPessoa('pf')}
                                checked={controlFormPessoa === 'pf'}
                              />
                            </Col>
                            <Col>
                              <Form.Check
                                type="radio"
                                label="Pessoa Jurídica"
                                id="pj"
                                name="pj"
                                value="pj"
                                onChange={() => setControlFormPessoa('pj')}
                                checked={controlFormPessoa === 'pj'}
                              />
                            </Col>
                          </Form.Row>

                        </Col>

                        <Col lg="7">
                          <Form.Label>Grupo</Form.Label>
                          <Form.Row>
                            <Col lg="2">
                              <Form.Check
                                id="is_cliente_final"
                                name="is_cliente_final"
                                type="checkbox"
                                label="Cliente final"
                                defaultChecked={ false }
                                onChange={handleInputChange}
                                checked={cliente?.is_cliente_final === 's'}
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
                                onChange={handleIsIsentoOnChange}
                                checked={controlFormIsIsento}
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
                                checked={cliente?.is_orgao_estadual === 's'}
                                isInvalid={!!errors.is_orgao_estadual}
                              />

                              <Form.Control.Feedback type="invalid" tooltip>
                                {errors?.is_orgao_estadual}
                              </Form.Control.Feedback>
                            </Col>
                            <Col lg="4">
                              <Form.Check
                                id="is_revenda"
                                name="is_revenda"
                                type="checkbox"
                                label="Revenda"
                                defaultChecked={ false }
                                onChange={handleInputChange}
                                checked={cliente?.is_revenda === 's'}
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
                          <Form.Label>{controlFormPessoa === 'pj' ? 'CNPJ' : 'CPF'}</Form.Label>
                          <Form.Control
                            placeholder={controlFormPessoa === 'pj' ? 'CNPJ' : 'CPF'}
                            id="cnpj"
                            name="cnpj"
                            type="text"
                            onChange={handleInputCNPJ}
                            value={cliente?.cnpj}
                            isInvalid={!!errors.cnpj}
                            as={InputMask}
                            mask={controlFormPessoa === 'pj' ? '99.999.999/9999-99' : '999.999.999-99'}
                          />
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors?.cnpj}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6}>
                          <Form.Label>IE</Form.Label>
                          <Form.Control
                            placeholder={controlFormIsIsento ? 'isento' : 'IE'}
                            id="ie"
                            name="ie"
                            type="text"
                            onChange={handleInputChange}
                            value={cliente?.ie}
                            isInvalid={!!errors.ie}
                            as={InputMask}
                            mask={ieMask}
                            disabled={controlFormIsIsento}
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
                            placeholder="Razão Social"
                            type="text"
                            onChange={handleInputChange}
                            value={cliente?.razao_social}
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
                            value={cliente?.nome_fantasia}
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
                              value={cliente?.email}
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
                              value={cliente?.email_nfe}
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
                              value={cliente?.email_nfe2}
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
                          <Form.Label>CEP.</Form.Label>
                          <Form.Control
                            placeholder="CEP"
                            id="cep"
                            name="cep"
                            type="text"
                            onChange={handleCepInputChange}
                            value={cliente?.cep}
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
                            value={cliente?.endereco}
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
                            value={cliente?.numero}
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
                            value={cliente?.uf}
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
                            value={cliente?.cidade}
                            isInvalid={!!errors.cidade}
                          >
                            <option selected value="default">Escolha cidade</option>
                            { controlCidades.map(cidade => <option key={cidade} value={cidade}>{cidade}</option>)}
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
                            value={cliente?.bairro}
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
                            value={cliente?.complemento}
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
                            value={cliente?.regiao}
                            isInvalid={!!errors.regiao}
                          />
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors?.regiao}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>
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
