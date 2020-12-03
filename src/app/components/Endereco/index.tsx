import React, { useState, useCallback, useEffect } from 'react'
import InputMask from 'react-input-mask'
import { Col, Form } from 'react-bootstrap'
import { makeTrazerEnderecoCep } from '../../../domain/clientes/factories/makeTrazerEnderecoCep'
import { useClienteDataCadastro } from '../../hooks/contexts'
import EstadosMunicipios from '../../assets/jsons/estados_municipios.json'
import { Cliente } from '../../../domain/clientes/models'

const trazerEnderecoPorCep = makeTrazerEnderecoCep()

export const Endereco = () => {
  const [controlCidades, setControlCidades] = useState([] as string[])
  const [cliente, setCliente] = useClienteDataCadastro()

  useEffect(() => {
    if (!cliente.data.uf) {
      return
    }

    const [estado] = EstadosMunicipios.estados.filter(estado => estado.sigla === cliente.data.uf)
    setControlCidades(estado.cidades)
  }, [cliente.data.uf])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    if (e.target.type === 'checkbox') {
      value = e.target.checked ? 's' : 'n'
    }

    const newCliente = {
      ...cliente.data,
      [e.target.name]: value
    }

    // remove o erro do campo que está sendo editado
    const newError = {
      ...cliente.error,
      [e.target.name]: ''
    }

    setCliente({
      error: newError,
      data: newCliente
    })
  }, [cliente, setCliente])

  const handleCepInputChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e)
    const cep = e.currentTarget.value.replace(/[^\w\s]/gi, '').replace(/_/g, '')

    if (cep.length === 8) {
      const response = await trazerEnderecoPorCep.execute(cep)
      if (!response?.data?.erro) {
        const [estado] = EstadosMunicipios.estados.filter(estado => estado.sigla === response.data.uf)
        setControlCidades(estado.cidades)

        const newValues: Cliente = {
          ...cliente.data,
          ...{
            endereco: response.data.logradouro,
            uf: response.data.uf,
            cidade: response.data.localidade,
            bairro: response.data.bairro,
            cep
          }
        }

        setCliente({ data: newValues })
      }
    }
  }, [cliente, handleInputChange, setCliente])

  return (
    <>
      <Form.Row>
        <Form.Group as={Col} md={2}>
          <Form.Label>CEP</Form.Label>
          <Form.Control
            placeholder="CEP"
            id="cep"
            name="cep"
            type="text"
            onChange={handleCepInputChange}
            value={cliente?.data?.cep}
            isInvalid={!!cliente?.error?.cep}
            as={InputMask}
            mask="99999-999"
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {cliente?.error?.cep}
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
            value={cliente?.data?.endereco}
            isInvalid={!!cliente?.error?.endereco}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {cliente?.error?.endereco}
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
            value={cliente?.data?.numero}
            isInvalid={!!cliente?.error?.numero}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {cliente?.error?.numero}
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
            onChange={handleInputChange}
            value={cliente?.data?.uf}
            isInvalid={!!cliente?.error?.uf}
          >
            <option selected value="default"></option>
            { EstadosMunicipios.estados.map(estado => <option key={estado.sigla} value={estado.sigla}>{estado.sigla}</option>)}
          </Form.Control>
          <Form.Control.Feedback type="invalid" tooltip>
            {cliente?.error?.uf}
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
            value={cliente?.data?.cidade}
            isInvalid={!!cliente?.error?.cidade}
          >
            <option selected value="default">Escolha cidade</option>
            { controlCidades.map(cidade => <option key={cidade} value={cidade}>{cidade}</option>)}
          </Form.Control>
          <Form.Control.Feedback type="invalid" tooltip>
            {cliente?.error?.cidade}
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
            value={cliente?.data?.bairro}
            isInvalid={!!cliente?.error?.bairro}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {cliente?.error?.bairro}
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
            value={cliente?.data?.complemento}
            isInvalid={!!cliente?.error?.complemento}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {cliente?.error?.regiao}
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
            value={cliente?.data?.regiao}
            isInvalid={!!cliente?.error?.regiao}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {cliente?.error?.regiao}
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
    </>

  )
}
