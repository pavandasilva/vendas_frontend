import React, { useCallback } from 'react'
import { FaList, FaShoppingCart, FaFunnelDollar, FaClipboardList } from 'react-icons/fa'
import { Cliente } from '../../../domain/clientes/models'
import { useAtendimentos } from '../../hooks'
import { useAtendimentoTabs } from '../../hooks/useAtendimentoTabs'
import { useOrcamentoTabs } from '../../hooks/useOrcamentoTabs'
import { Container, Button } from './styles'

interface MenuAtendimentoProps {
  cliente: Cliente
}

export const MenuAtendimento = ({ cliente }: MenuAtendimentoProps) => {
  const { setCurrentTab, currentTabs } = useAtendimentoTabs()
  const { atendimentos, startOrcamento } = useAtendimentos()
  const { setCurrentTab: setCurrentOrcamentoTab } = useOrcamentoTabs()

  const handleNovoOrcamentoOnClick = useCallback(() => {
    startOrcamento(cliente?.id as number)
    setCurrentTab(cliente?.id as number, 'orcamentoEmAndamento')
    setCurrentOrcamentoTab(cliente?.id as number, 'dadosGerais')
  }, [cliente, setCurrentOrcamentoTab, setCurrentTab, startOrcamento])

  return (
    <Container >
      <Button
        selected={currentTabs[cliente?.id as number] === 'geral'}
        type="button"
        onClick={() => setCurrentTab(cliente?.id as number, 'geral')}>
        <FaList /><span>Geral</span>
      </Button>
      <Button
        selected={currentTabs[cliente?.id as number] === 'pedidos'}
        type="button"
        onClick={() => setCurrentTab(cliente?.id as number, 'pedidos')}>
        <FaShoppingCart /><span>Pedidos</span>
      </Button>
      <Button
        selected={currentTabs[cliente?.id as number] === 'financeiro'}
        type="button"
        onClick={() => setCurrentTab(cliente?.id as number, 'financeiro')}>
        <FaFunnelDollar /><span>Financeiro</span>
      </Button>

      { atendimentos[cliente?.id as number]?.orcamento?.contato
        ? (
          <Button
            selected={currentTabs[cliente?.id as number] === 'orcamentoEmAndamento'}
            type="button"
            onClick={() => setCurrentTab(cliente?.id as number, 'orcamentoEmAndamento')}>
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
