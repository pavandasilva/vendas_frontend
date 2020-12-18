import React from 'react'
import { Geral, MenuAtendimento, PedidoEmAndamento } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { useAtendimentoCliente } from '../../hooks/useAtendimentoCliente'
import { Financeiro } from '../Financeiro'
import { Pedidos } from '../Pedidos'

import { Container, Main } from './styles'

interface AtendimentoProps {
  cliente: Cliente
}

export const Atendimento = ({ cliente }: AtendimentoProps) => {
  const { currentTabs } = useAtendimentoCliente()

  return (
    <Container>
      <Main>
        {currentTabs[cliente?.id as number] === 'geral' && <Geral /> }
        {currentTabs[cliente?.id as number] === 'pedidos' && <Pedidos /> }
        {currentTabs[cliente?.id as number] === 'financeiro' && <Financeiro /> }
        {currentTabs[cliente?.id as number] === 'pedidoEmAndamento' && <PedidoEmAndamento /> }
      </Main>
      <MenuAtendimento cliente={cliente}/>
    </Container>
  )
}
