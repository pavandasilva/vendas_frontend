import React, { useCallback, useEffect } from 'react'
import { FaShare } from 'react-icons/fa'
import { ResumoOrcamento, Produtos, Button, DadosGerais } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { makeGravarOrcamento } from '../../../domain/pedidos/factories/makeGravarOrcamento'
import { Orcamento } from '../../../domain/pedidos/models'
import { ItemOrcamentoProvider, OrcamentoTabsType } from '../../contexts'
import { useAtendimentos, useAtendimentoTabs, useUseCaseController } from '../../hooks'
import { useOrcamentoTabs } from '../../hooks/useOrcamentoTabs'
import { HeaderAtendimento } from '../HeaderAtendimento'
import { Container, ContentHeaderAtendimento } from './styles'

interface OrcamentoEmAndamentoProps {
  cliente: Cliente
}

export const OrcamentoEmAndamento = ({ cliente }: OrcamentoEmAndamentoProps) => {
  const { currentTabs, setCurrentTab } = useOrcamentoTabs()
  const { atendimentos, removeAtendimento } = useAtendimentos()
  const { executeUseCase } = useUseCaseController()
  const { setCurrentTab: setAtendimentoTab } = useAtendimentoTabs()

  useEffect(() => {
    if (!currentTabs[cliente.id as number]) {
      setCurrentTab(cliente.id as number, 'dadosGerais')
    }
  }, [currentTabs, cliente.id, setCurrentTab])

  const handleFinalizarOnClick = useCallback(async () => {
    function afterSaved () {
      removeAtendimento(cliente.id as number)
      setAtendimentoTab(cliente.id as number, 'geral')
    }

    const orcamento = atendimentos[cliente.id as number].orcamento
    const gravarOrcamento = makeGravarOrcamento()

    executeUseCase<Orcamento>(
      gravarOrcamento,
      orcamento as Orcamento,
      'Orçamento salvo com sucesso!',
      'Deseja salvar o orçamento?',
      afterSaved,
      true
    )
  }, [atendimentos, cliente.id, executeUseCase, removeAtendimento, setAtendimentoTab])

  const handleMenuOnClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentTab(cliente?.id as number, e.currentTarget.name as OrcamentoTabsType)
  }, [cliente, setCurrentTab])

  function getProdutosTabTitle (): string {
    let title = 'Produtos do orçamento'

    if (!atendimentos[cliente?.id as number].orcamento?.contato?.nome) {
      title = 'Primeiro selecione um contato'
    }

    if (!atendimentos[cliente?.id as number].orcamento?.deposito?.nome) {
      title = 'Primeiro selecione um depósito'
    }

    return title
  }

  return (
    <ItemOrcamentoProvider>
      <Container>
        <HeaderAtendimento>
          <ContentHeaderAtendimento>
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
              disabled={
                !atendimentos[cliente?.id as number].orcamento?.contato?.nome ||
                !atendimentos[cliente?.id as number].orcamento?.deposito?.nome}
              onClick={handleMenuOnClick}>Produtos
            </Button>

            <div>
              <Button mode="primary" startIcon={FaShare} onClick={handleFinalizarOnClick}>Finalizar</Button>
            </div>
          </ContentHeaderAtendimento>
        </HeaderAtendimento>

        <ResumoOrcamento cliente={cliente}/>
        { currentTabs[cliente?.id as number] === 'dadosGerais' && <DadosGerais cliente={cliente} /> }
        { currentTabs[cliente?.id as number] === 'produtos' && <Produtos cliente={cliente} /> }
      </Container>
    </ItemOrcamentoProvider>
  )
}
