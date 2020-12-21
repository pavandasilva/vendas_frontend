import React, { useCallback } from 'react'
import { FaShare } from 'react-icons/fa'
import { Button, Produtos } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { OrcamentoTabsType } from '../../contexts'
import { useAtendimentoCliente } from '../../hooks/useAtendimentoCliente'
import { useOrcamentoTabs } from '../../hooks/useOrcamentoTabs'
import { DadosGerais } from '../DadosGerais'
import { Container, Content } from './styles'

interface PedidoEmAndamentoProps {
  cliente: Cliente
}

export const PedidoEmAndamento = ({ cliente }: PedidoEmAndamentoProps) => {
  const { pedidos, setPedido } = useAtendimentoCliente()
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

      { currentTabs[cliente.id as number] === 'dadosGerais' && <DadosGerais /> }
      { currentTabs[cliente.id as number] === 'produtos' && <Produtos cliente={cliente} /> }

      {/* <header>
        <div>
          <Input type='text' startIcon={FaSearch} onChange={handleFilterOnChange}/>
        </div>
        <div>
          <Button
            mode="primary"
            startIcon={FaPlus}
            type="button"
            onClick={handleSalvar}>
            Adicionar produto
          </Button>
          <Button
            mode="primary"
            startIcon={FaShare}
            type="button"
            onClick={handleSalvar}>
            Adicionar produto
          </Button>
        </div>
        <div>
          <Button
            mode="confirm"
            startIcon={FaShare}
            type="button"
            onClick={handleSalvar}>
            Finalizar
          </Button>
        </div>
      </header> */}
      <Content>
        {/* <ReactTable
          columns={columns}
          data={pedidos[cliente.id as number]?.itens}
          pageSize={perPage}
          page={currentPage}
          onPageChange={handleOnPageChange}
          manual
          sortable={false}
          nextText="Próximo"
          previousText="Anterior"
          pageText="Página"
          ofText= "de"
          showPageSizeOptions= { false }
          loadingText="carregando..."
          noDataText="Nenhum item no orçamento"
        /> */}
      </Content>
    </Container>

  )
}
