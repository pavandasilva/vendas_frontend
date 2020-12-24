import React from 'react'
import { Geral, MenuAtendimento } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { useAtendimentoTabs } from '../../hooks/useAtendimentoTabs'
import useCliente from '../../hooks/useCliente'
import { Financeiro } from '../Financeiro'
import { OrcamentoEmAndamento } from '../OrcamentoEmAndamento'
import { Pedidos } from '../Pedidos'

import { Container, Main } from './styles'

interface AtendimentoProps {
  clienteId: number
}

export const Atendimento = ({ clienteId }: AtendimentoProps) => {
  const { data: cliente } = useCliente(clienteId)
  const { currentTabs } = useAtendimentoTabs()

  return (
    <Container>
      <Main>
        {currentTabs[cliente?.data.id as number] === 'geral' && <Geral /> }
        {currentTabs[cliente?.data.id as number] === 'pedidos' && <Pedidos cliente={cliente?.data as Cliente}/> }
        {currentTabs[cliente?.data.id as number] === 'financeiro' && <Financeiro /> }
        {currentTabs[cliente?.data.id as number] === 'pedidoEmAndamento' && <OrcamentoEmAndamento cliente={cliente?.data as Cliente}/> }
      </Main>
      <MenuAtendimento cliente={cliente?.data as Cliente}/>
    </Container>
  )
}
