import React, { useCallback } from 'react'
import { FaShare } from 'react-icons/fa'
import { ResumoOrcamento, Produtos, Button, DadosGerais } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { OrcamentoTabsType } from '../../contexts'
import { useOrcamentoTabs } from '../../hooks/useOrcamentoTabs'
import { Container } from './styles'

interface OrcamentoEmAndamentoProps {
  cliente: Cliente
}

export const OrcamentoEmAndamento = ({ cliente }: OrcamentoEmAndamentoProps) => {
  const { currentTabs, setCurrentTab } = useOrcamentoTabs()

  const handleFilterOnChange = () => {

  }

  const handleFinalizarOnClick = () => {

  }

  const handleOnPageChange = () => {

  }

  const handleMenuOnClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentTab(cliente.id as number, e.currentTarget.name as OrcamentoTabsType)
  }, [cliente.id, setCurrentTab])
  return (
    <Container>
      <header>
        <div>
          <Button
            name="dadosGerais"
            mode="secondary"
            active={currentTabs[cliente.id as number] === 'dadosGerais'}
            onClick={handleMenuOnClick}
          >
            Dados gerais
          </Button>
          <Button
            name="produtos"
            mode="secondary"
            active={currentTabs[cliente.id as number] === 'produtos'}
            onClick={handleMenuOnClick}>Produtos
          </Button>
        </div>
        <div>
          <Button mode="primary" startIcon={FaShare} onClick={handleFinalizarOnClick}>Finalizar</Button>
        </div>
      </header>
      <ResumoOrcamento cliente={cliente}></ResumoOrcamento>
      { currentTabs[cliente.id as number] === 'dadosGerais' && <DadosGerais /> }
      { currentTabs[cliente.id as number] === 'produtos' && <Produtos cliente={cliente} /> }
    </Container>

  )
}
