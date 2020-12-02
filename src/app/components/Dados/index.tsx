import React, { useState, useCallback, useEffect } from 'react'
import capitalize from 'capitalize-pt-br'
import InputMask from 'react-input-mask'
import EstadosMunicipios from '../../assets/jsons/estados_municipios.json'
import { getIEMask } from '../../../helpers/getIEMask'
import { makeTrazerDadosCNPJ } from '../../../domain/clientes/factories/makeTrazerDadosCNPJ'
import { removerAcento } from '../../../helpers/removerAcentos'
import { useClienteDataCadastro } from '../../hooks/contexts/clienteDataCadastroContext'
import { Col, Form, InputGroup, Tab } from 'react-bootstrap'
import { FaAt } from 'react-icons/fa'
import { Cliente } from '../../../domain/clientes/models'

const trazerDadosCNPJ = makeTrazerDadosCNPJ()

export const Dados = () => {
  const [cliente, setCliente] = useClienteDataCadastro()

  const [controlFormIsIsento, setControlFormIsIsento] = useState(false)
  const [errors, setErrors] = useState({} as any)
  const [controlFormPessoa, setControlFormPessoa] = useState('pj')
  const [ieMask, setIeMask] = useState('99999999999')

  useEffect(() => {
    cliente.uf && setIeMask(getIEMask(cliente.uf))
  }, [cliente.uf])

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

  const handleIsIsentoOnChange = useCallback(() => {
    setControlFormIsIsento(v => !v)
  }, [])

  const handleInputCNPJ = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e)
    let cidade = ''
    const cnpj = e.currentTarget.value.replace(/[^\w\s]/gi, '').replace(/_/g, '')

    if (cnpj.length === 14) {
      const response = await trazerDadosCNPJ.execute('bf2cc265e3073aab06df3484f56f603e7c409b55e01cddc0bfde6781624c8494', cnpj)

      if (response.data) {
        const [estado] = EstadosMunicipios.estados.filter(estado => estado.sigla === response.data.uf)

        if (estado) {
          const filtered: string[] = estado.cidades.filter(cidade => {
            return removerAcento(cidade).toLowerCase() === removerAcento(response.data.municipio).toLowerCase()
          })

          if (filtered[0]) {
            cidade = filtered[0]
          }
        }

        const newCliente: Cliente = {
          ...cliente,
          ...{
            endereco: capitalize(response.data.logradouro),
            uf: response.data.uf,
            cidade,
            bairro: capitalize(response.data.bairro),
            cep: response.data.cep,
            cnpj,
            razao_social: capitalize(response.data.nome),
            nome_fantasia: capitalize(response.data.fantasia),
            email: response.data.email,
            complemento: capitalize(response.data.complemento),
            numero: response.data.numero
          }
        }

        setCliente(newCliente)
      }
    }
  }

  return (
    <>
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
    </>

  )
}