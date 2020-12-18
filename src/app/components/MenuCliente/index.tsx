import React from 'react'
import { FaList, FaShoppingCart, FaFunnelDollar } from 'react-icons/fa'
import { useAtendimentoCliente } from '../../hooks/useAtendimentoCliente'

import { Container } from './styles'

export const MenuCLiente = () => {
  const { setCurrentTab } = useAtendimentoCliente()

  return (
    <Container >
      <button type="button" onClick={() => setCurrentTab('geral')}><FaList /><span>Geral</span></button>
      <button type="button" onClick={() => setCurrentTab('pedidos')}><FaShoppingCart /><span>Pedidos</span></button>
      <button type="button" onClick={() => setCurrentTab('financeiro')}><FaFunnelDollar /><span>Financeiro</span></button>
    </Container>
  )
}
