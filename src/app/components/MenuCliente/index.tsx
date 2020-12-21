import React from 'react'
import { FaList, FaShoppingCart, FaFunnelDollar, FaClipboardList } from 'react-icons/fa'
import { Cliente } from '../../../domain/clientes/models'
import { Pedido } from '../../../domain/clientes/models/pedido'
import { useAtendimentoCliente } from '../../hooks/useAtendimentoCliente'
import { useOrcamentoTabs } from '../../hooks/useOrcamentoTabs'
import { Container, Button } from './styles'

interface MenuAtendimentoProps {
  cliente: Cliente
}

export const MenuAtendimento = ({ cliente }: MenuAtendimentoProps) => {
  const { setCurrentTab, currentTabs, pedidos, setPedido } = useAtendimentoCliente()
  const { setCurrentTab: setCurrentOrcamentoTab } = useOrcamentoTabs()

  const handleNovoOrcamentoOnClick = () => {
    const initialState: Pedido = {
      itens: []
    }

    setPedido(cliente.id as number, initialState)
    setCurrentTab(cliente.id as number, 'pedidoEmAndamento')
    setCurrentOrcamentoTab(cliente.id as number, 'dadosGerais')
  }

  return (
    <Container >
      <Button
        selected={currentTabs[cliente.id as number] === 'geral'}
        type="button"
        onClick={() => setCurrentTab(cliente.id as number, 'geral')}>
        <FaList /><span>Geral</span>
      </Button>
      <Button
        selected={currentTabs[cliente.id as number] === 'pedidos'}
        type="button"
        onClick={() => setCurrentTab(cliente.id as number, 'pedidos')}>
        <FaShoppingCart /><span>Pedidos</span>
      </Button>
      <Button
        selected={currentTabs[cliente.id as number] === 'financeiro'}
        type="button"
        onClick={() => setCurrentTab(cliente.id as number, 'financeiro')}>
        <FaFunnelDollar /><span>Financeiro</span>
      </Button>

      { pedidos[cliente.id as number]
        ? (
          <Button
            selected={currentTabs[cliente.id as number] === 'pedidoEmAndamento'}
            type="button"
            onClick={() => setCurrentTab(cliente.id as number, 'pedidoEmAndamento')}>
            <FaClipboardList /><span>Orçamento em andamento</span>
          </Button>
        )
        : (
          <Button
            type="button"
            onClick={handleNovoOrcamentoOnClick}>
            <FaClipboardList /><span>Novo orçamento</span>
          </Button>
        )

      }

    </Container>
  )
}
