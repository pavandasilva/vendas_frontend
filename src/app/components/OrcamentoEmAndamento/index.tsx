import React, { useCallback } from 'react'
import { FaShare } from 'react-icons/fa'
import { ResumoOrcamento, Produtos, Button, DadosGerais } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { OrcamentoTabsType } from '../../contexts'
import { useOrcamentos } from '../../hooks/useOrcamentos'
import { useOrcamentoTabs } from '../../hooks/useOrcamentoTabs'
import { Container } from './styles'

interface OrcamentoEmAndamentoProps {
  cliente: Cliente
}

export const OrcamentoEmAndamento = ({ cliente }: OrcamentoEmAndamentoProps) => {
  const { currentTabs, setCurrentTab } = useOrcamentoTabs()
  const { orcamentos } = useOrcamentos()

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
            title={orcamentos[cliente.id as number].contato?.nome ? 'Produtos do pedido' : 'Primeiro selecione um contato'}
            active={currentTabs[cliente.id as number] === 'produtos'}
            disabled={!orcamentos[cliente.id as number].contato?.nome}
            onClick={handleMenuOnClick}>Produtos
          </Button>
        </div>
        <div>
          <Button mode="primary" startIcon={FaShare} onClick={handleFinalizarOnClick}>Finalizar</Button>
        </div>
      </header>
      <ResumoOrcamento cliente={cliente}></ResumoOrcamento>
      { currentTabs[cliente.id as number] === 'dadosGerais' && <DadosGerais cliente={cliente} /> }
      { currentTabs[cliente.id as number] === 'produtos' && <Produtos cliente={cliente} /> }
    </Container>

  )
}
