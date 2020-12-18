import React, { useState } from 'react'
import { Geral, Pedidos, Financeiro, PedidoEmAndamento } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { useAtendimentoCliente } from '../../hooks/useAtendimentoCliente'
import { MenuCLiente } from '../MenuCliente'

import { Container, Main } from './styles'

interface AtendimentoProps {
  cliente: Cliente
}

export const Atendimento = ({ cliente }: AtendimentoProps) => {
  const { currentTab } = useAtendimentoCliente()

  return (
    <Container>
      <Main>
        { currentTab === 'geral' && <Geral /> }
        { currentTab === 'pedidos' && <Pedidos /> }
        { currentTab === 'financeiro' && <Financeiro /> }
        { currentTab === 'pedidoEmAndamento' && <PedidoEmAndamento /> }
      </Main>
      <MenuCLiente />
    </Container>
  )
}
