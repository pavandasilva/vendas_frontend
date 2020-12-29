import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Input } from '..'
import { FormRow } from '../../styles/global'
import { Select } from '../Select'
import EstadosMunicipios from '../../assets/jsons/estados_municipios.json'
import { Container } from './styles'
import { makeTrazerEnderecoCep } from '../../../domain/clientes/factories/makeTrazerEnderecoCep'
import { Cliente } from '../../../domain/clientes/models'
import { useCadastroCliente } from '../../hooks/useCadastroCliente'

const trazerEnderecoPorCep = makeTrazerEnderecoCep()

export const Endereco = () => {
  const [controlCidades, setControlCidades] = useState([] as string[])
  const {
    data: cliente,
    setData: setCliente,
    dataError: clienteError,
    setDataError: setClienteError,
    dataMode
  } = useCadastroCliente()

  useEffect(() => {
    if (!cliente.uf) {
      return
    }

    const [estado] = EstadosMunicipios.estados.filter(estado => estado.sigla === cliente.uf?.toUpperCase())

    setControlCidades(estado?.cidades)
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
          label="CEP"
          value={cliente?.cep}
          placeholder='CEP'
          onChange={handleCepInputChange}
          error={clienteError?.cep}
          type="cep"
          disabled= { dataMode === 'edit'}
        />

        <Input
          width='4'
          name="endereco"
          label="Endereço"
          value={cliente?.endereco}
          placeholder='Endereço'
          onChange={handleInputChange}
          error={clienteError?.endereco}
          disabled= { dataMode === 'edit'}
        />
        <Input
          width='1'
          name="numero"
          label="Número"
          value={cliente?.numero}
          placeholder='Número'
          onChange={handleInputChange}
          error={clienteError?.numero}
          disabled= { dataMode === 'edit'}
        />

      </FormRow>
      <FormRow>
        <Select
          width='2'
          name="uf"
          onChange={handleSelectChange}
          value={cliente?.uf?.toUpperCase()}
          title="Estado"
          disabled= { dataMode === 'edit'}
          defaultValue=""
        >
          <option value="" disabled selected>Estado</option>
          { EstadosMunicipios?.estados?.map(estado => <option key={estado.sigla} value={estado.sigla}>{estado.nome}</option>)}
        </Select>

        <Select
          name="cidade"
          width='4'
          onChange={handleSelectChange}
          value={dataMode === 'edit' ? '' : cliente?.cidade}
          title="Cidade"
          disabled= { dataMode === 'edit'}
        >
          <option value="" disabled selected>{ dataMode === 'edit' ? cliente?.cidade : 'Cidade'} </option>
          { dataMode === 'create' && controlCidades?.map(cidade => <option key={cidade} value={cidade}>{cidade}</option>)}
        </Select>
        <Input
          width='7'
          name="bairro"
          label="Bairro"
          value={cliente?.bairro}
          placeholder='Bairro'
          onChange={handleInputChange}
          error={clienteError?.bairro}
          disabled= { dataMode === 'edit'}
        />
      </FormRow>
      <FormRow>
        <Input
          width='4'
          name="complemento"
          label="Complemento"
          value={cliente?.complemento}
          placeholder='Complemento do endereço'
          onChange={handleInputChange}
          error={clienteError?.complemento}
          disabled= { dataMode === 'edit'}
        />
        <Input
          width='3'
          name="regiao"
          label="Região"
          value={cliente?.regiao}
          placeholder='Região'
          onChange={handleInputChange}
          error={clienteError?.regiao}
          disabled= { dataMode === 'edit'}
        />
      </FormRow>
    </Container>
  )
}
