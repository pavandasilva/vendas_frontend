import React from 'react'
import { FaList, FaShoppingCart, FaFunnelDollar } from 'react-icons/fa'
import { Cliente } from '../../../domain/clientes/models'
import { useAtendimentoCliente } from '../../hooks/useAtendimentoCliente'
import { Container } from './styles'

interface MenuAtendimentoProps {
  cliente: Cliente
}

export const MenuAtendimento = ({ cliente }: MenuAtendimentoProps) => {
  const { setCurrentTab } = useAtendimentoCliente()

  return (
    <Container >
      <button type="button" onClick={() => setCurrentTab(cliente.id as number, 'geral')}><FaList /><span>Geral</span></button>
      <button type="button" onClick={() => setCurrentTab(cliente.id as number, 'pedidos')}><FaShoppingCart /><span>Pedidos</span></button>
      <button type="button" onClick={() => setCurrentTab(cliente.id as number, 'financeiro')}><FaFunnelDollar /><span>Financeiro</span></button>
    </Container>
  )
}
