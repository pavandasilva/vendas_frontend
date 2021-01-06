import React, { useCallback, useEffect } from 'react'
import { FaShare } from 'react-icons/fa'
import { ResumoOrcamento, Produtos, Button, DadosGerais } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { makeGravarOrcamento } from '../../../domain/pedidos/factories/makeGravarOrcamento'
import { Orcamento } from '../../../domain/pedidos/models'
import { ItemOrcamentoProvider, OrcamentoTabsType } from '../../contexts'
import { useAtendimentoTabs, useUseCaseController } from '../../hooks'
import { useOrcamentos } from '../../hooks/useOrcamentos'
import { useOrcamentoTabs } from '../../hooks/useOrcamentoTabs'
import { Container } from './styles'

interface OrcamentoEmAndamentoProps {
  cliente: Cliente
}

export const OrcamentoEmAndamento = ({ cliente }: OrcamentoEmAndamentoProps) => {
  const { currentTabs, setCurrentTab } = useOrcamentoTabs()
  const { orcamentos, removeOrcamento } = useOrcamentos()
  const { executeUseCase } = useUseCaseController()
  const { setCurrentTab: setAtendimentoTab } = useAtendimentoTabs()

  useEffect(() => {
    if (!currentTabs[cliente.id as number]) {
      setCurrentTab(cliente.id as number, 'dadosGerais')
    }
  }, [currentTabs, cliente.id, setCurrentTab])

  const handleFinalizarOnClick = useCallback(async () => {
    function afterSave () {
      removeOrcamento(cliente.id as number)
      setAtendimentoTab(cliente.id as number, 'geral')
    }

    const orcamento = orcamentos[cliente.id as number]
    const gravarOrcamento = makeGravarOrcamento()

    executeUseCase<Orcamento>(
      gravarOrcamento,
      orcamento,
      'Orçamento salvo com sucesso!',
      'Deseja salvar o orçamento?',
      afterSave,
      true
    )
  }, [cliente.id, executeUseCase, orcamentos, removeOrcamento, setAtendimentoTab])

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
