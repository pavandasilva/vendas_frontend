import React from 'react'
import { FaList, FaShoppingCart, FaFunnelDollar } from 'react-icons/fa'

import { Container } from './styles'

export const MenuCLiente = () => {
  return (
    <Container >
      <button type="button"><FaList /><span>Geral</span></button>
      <button type="button"><FaShoppingCart /><span>Pedidos</span></button>
      <button type="button"><FaFunnelDollar /><span>Financeiro</span></button>
    </Container>
  )
}
