import React, { useCallback } from 'react'
import { FaShare } from 'react-icons/fa'
import { StringLiteralLike } from 'typescript'
import { ResumoOrcamento, Produtos, Button, DadosGerais } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { ItemOrcamentoProvider, OrcamentoTabsType } from '../../contexts'
import { useOrcamentos } from '../../hooks/useOrcamentos'
import { useOrcamentoTabs } from '../../hooks/useOrcamentoTabs'
import { Container } from './styles'

interface OrcamentoEmAndamentoProps {
  cliente: Cliente
}

export const OrcamentoEmAndamento = ({ cliente }: OrcamentoEmAndamentoProps) => {
  const { currentTabs, setCurrentTab } = useOrcamentoTabs()
  const { orcamentos } = useOrcamentos()

  const handleFinalizarOnClick = () => {

  }

  const handleMenuOnClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentTab(cliente?.id as number, e.currentTarget.name as OrcamentoTabsType)
  }, [cliente, setCurrentTab])

  function getProdutosTabTitle (): string {
    let title = 'Produtos do orçamento'

    if (!orcamentos[cliente?.id as number].contato?.nome) {
      title = 'Primeiro selecione um contato'
    }

    if (!orcamentos[cliente?.id as number].deposito?.nome) {
      title = 'Primeiro selecione um depósito'
    }

    return title
  }

  return (
    <ItemOrcamentoProvider>
      <Container>
        <header>
          <div>
            <Button
              name="dadosGerais"
              mode="secondary"
              active={currentTabs[cliente?.id as number] === 'dadosGerais'}
              onClick={handleMenuOnClick}
            >
            Dados gerais
            </Button>
            <Button
              name="produtos"
              mode="secondary"
              title={getProdutosTabTitle()}
              active={currentTabs[cliente?.id as number] === 'produtos'}
              disabled={!orcamentos[cliente?.id as number].contato?.nome && !orcamentos[cliente?.id as number].deposito?.nome}
              onClick={handleMenuOnClick}>Produtos
            </Button>
          </div>
          <div>
            <Button mode="primary" startIcon={FaShare} onClick={handleFinalizarOnClick}>Finalizar</Button>
          </div>
        </header>

        <ResumoOrcamento cliente={cliente}/>
        { currentTabs[cliente?.id as number] === 'dadosGerais' && <DadosGerais cliente={cliente} /> }
        { currentTabs[cliente?.id as number] === 'produtos' && <Produtos cliente={cliente} /> }
      </Container>
    </ItemOrcamentoProvider>
  )
}
