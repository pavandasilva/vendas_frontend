import React, { ChangeEvent, useCallback } from 'react'
import { Input } from '..'
import { useCadastroCliente } from '../../hooks'
import { FormRow } from '../../styles/global'
import { Container } from './styles'

export const Endereco = () => {
  const {
    data: cliente,
    setData: setCliente,
    dataError: clienteError,
    setDataError: setClienteError
  } = useCadastroCliente()

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

  return (
    <Container>
      <FormRow>
        <Input
          width='1'
          name="cep"
          title="CEP"
          value={cliente?.cep}
          placeholder='CEP'
          onChange={handleInputChange}
          error={clienteError?.cep}
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
        <Input
          width='1'
          name="estado"
          title="Estado"
          value={cliente?.uf}
          placeholder='Estado'
          onChange={handleInputChange}
          error={clienteError?.uf}
        />

        <Input
          width='5'
          name="cidade"
          title="Cidade"
          value={cliente?.cidade}
          placeholder='Cidade'
          onChange={handleInputChange}
          error={clienteError?.cidade}
        />
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
