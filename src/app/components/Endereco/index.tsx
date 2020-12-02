import React, { useState, useCallback, useEffect } from 'react'
import InputMask from 'react-input-mask'
import { Col, Form } from 'react-bootstrap'
import { makeTrazerEnderecoCep } from '../../../domain/clientes/factories/makeTrazerEnderecoCep'
import { useClienteDataCadastro } from '../../hooks/contexts'
import EstadosMunicipios from '../../assets/jsons/estados_municipios.json'

const trazerEnderecoPorCep = makeTrazerEnderecoCep()

export const Endereco = () => {
  const [errors, setErrors] = useState({} as any)
  const [controlCidades, setControlCidades] = useState([] as string[])
  const [cliente, setCliente] = useClienteDataCadastro()

  useEffect(() => {
    if (!cliente.uf) {
      return
    }

    const [estado] = EstadosMunicipios.estados.filter(estado => estado.sigla === cliente.uf)
    setControlCidades(estado.cidades)
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
            bairro: response.data.bairro,
            cep
          }
        }

        setCliente(newValues)
      }
    }
  }, [cliente, handleInputChange, setCliente])

  return (
    <>
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
            onChange={handleInputChange}
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
    </>

  )
}
