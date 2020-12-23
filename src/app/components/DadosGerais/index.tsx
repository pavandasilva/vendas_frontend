import React, { useEffect, useState } from 'react'
import { Input, Select } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { Orcamento } from '../../../domain/clientes/models/orcamento'
import { useOrcamentos } from '../../hooks/useOrcamentos'
import { FormRow } from '../../styles/global'
import { Container } from './styles'

interface DadosGeraisProps {
  cliente: Cliente
}

export const DadosGerais = ({ cliente }: DadosGeraisProps) => {
  const { orcamentos, setItensOrcamento } = useOrcamentos()

  useEffect(() => {
    console.log('useEffect called')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orcamentos[cliente.id as number]])

  return (
    <Container>
      <FormRow>
        <Input
          width='1'
          name="cep"
          title="Depósito"
          value={cliente?.cep}
          placeholder='CEP'
          /* onChange={handleCepInputChange}
          error={clienteError?.cep} */
          type="cep"
          /*     disabled= { dataMode === 'edit'} */
        />

        <Input
          width='4'
          name="endereco"
          title="Endereço"
          value={cliente?.endereco}
          placeholder='Endereço'
          /*      onChange={handleInputChange}
          error={clienteError?.endereco}
          disabled= { dataMode === 'edit'} */
        />
        <Input
          width='1'
          name="numero"
          title="Número"
          value={cliente?.numero}
          placeholder='Número'
          /*        onChange={handleInputChange}
          error={clienteError?.numero}
          disabled= { dataMode === 'edit'} */
        />

      </FormRow>
    </Container>
  )
}
