import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Input } from '..'
import { useCadastroCliente } from '../../hooks'
import { FormRow } from '../../styles/global'
import { Select } from '../Select'
import EstadosMunicipios from '../../assets/jsons/estados_municipios.json'
import { Container } from './styles'
import { makeTrazerEnderecoCep } from '../../../domain/clientes/factories/makeTrazerEnderecoCep'
import { Cliente } from '../../../domain/clientes/models'

const trazerEnderecoPorCep = makeTrazerEnderecoCep()

export const Endereco = () => {
  const [controlCidades, setControlCidades] = useState([] as string[])
  const {
    data: cliente,
    setData: setCliente,
    dataError: clienteError,
    setDataError: setClienteError
  } = useCadastroCliente()

  useEffect(() => {
    if (!cliente.uf) {
      return
    }

    const [estado] = EstadosMunicipios.estados.filter(estado => estado.sigla === cliente.uf)
    setControlCidades(estado.cidades)
  }, [cliente.uf])

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    const newCliente = {
      ...cliente,
      [e.target.name]: value
    }

    // remove o erro do campo que está sendo editado
    const newError = {
      ...clienteError,
      [e.target.name]: ''
    }

    setCliente(newCliente)
    setClienteError(newError)
  }, [cliente, clienteError, setCliente, setClienteError])

  const handleSelectChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    let value = e.target.value

    const newCliente = {
      ...cliente,
      [e.target.name]: value
    }

    setCliente(newCliente)
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
    <Container>
      <FormRow>
        <Input
          width='1'
          name="cep"
          title="CEP"
          value={cliente?.cep}
          placeholder='CEP'
          onChange={handleCepInputChange}
          error={clienteError?.cep}
          type="cep"
        />

        <Input
          width='4'
          name="endereco"
          title="Endereço"
          value={cliente?.endereco}
          placeholder='Endereço'
          onChange={handleInputChange}
          error={clienteError?.endereco}
        />
        <Input
          width='1'
          name="numero"
          title="Número"
          value={cliente?.numero}
          placeholder='Número'
          onChange={handleInputChange}
          error={clienteError?.numero}
        />

      </FormRow>
      <FormRow>
        <Select
          width='2'
          name="uf"
          onChange={handleSelectChange}
          value={cliente?.uf}
          title="Estado"
        >
          <option value="" disabled selected>Estado</option>
          { EstadosMunicipios.estados.map(estado => <option key={estado.sigla} value={estado.sigla}>{estado.nome}</option>)}
        </Select>

        <Select
          name="cidade"
          width='4'
          onChange={handleSelectChange}
          value={cliente?.cidade}
          title="Cidade"
        >
          <option value="" disabled selected>Cidade</option>
          { controlCidades.map(cidade => <option key={cidade} value={cidade}>{cidade}</option>)}
        </Select>
        <Input
          width='7'
          name="bairro"
          title="Bairro"
          value={cliente?.bairro}
          placeholder='Bairro'
          onChange={handleInputChange}
          error={clienteError?.bairro}
        />
      </FormRow>
      <FormRow>
        <Input
          width='4'
          name="complemento"
          title="Complemento"
          value={cliente?.complemento}
          placeholder='Complemento do endereço'
          onChange={handleInputChange}
          error={clienteError?.complemento}
        />
        <Input
          width='3'
          name="regiao"
          title="Região"
          value={cliente?.regiao}
          placeholder='Região'
          onChange={handleInputChange}
          error={clienteError?.regiao}
        />
      </FormRow>
    </Container>
  )
}
