import React from 'react'
import { Geral, MenuAtendimento } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { useAtendimentoTabs } from '../../hooks'
import { Financeiro } from '../Financeiro'
import { OrcamentoEmAndamento } from '../OrcamentoEmAndamento'
import { Pedidos } from '../Pedidos'
import { Container, Main } from './styles'

interface AtendimentoProps {
  cliente: Cliente
}

export const Atendimento = ({ cliente }: AtendimentoProps) => {
  // const { data: cliente } = useCliente(clienteId)
  const { currentTabs } = useAtendimentoTabs()

  return (
    <Container>
      <Main>
        {currentTabs[cliente?.id as number] === 'geral' && <Geral /> }
        {currentTabs[cliente?.id as number] === 'pedidos' && <Pedidos cliente={cliente}/> }
        {currentTabs[cliente?.id as number] === 'financeiro' && <Financeiro /> }
        {
          currentTabs[cliente?.id as number] === 'pedidoEmAndamento' &&
          <OrcamentoEmAndamento cliente={cliente}/>
        }
      </Main>
      <MenuAtendimento cliente={cliente}/>
    </Container>
  )
}
