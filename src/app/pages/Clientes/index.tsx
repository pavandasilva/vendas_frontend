import React, { useCallback, useMemo, useState } from 'react'
import { FaSearch, FaUser } from 'react-icons/fa'
import { MainLayout } from '../../layouts/MainLayout'
import { Atendimento, Button, ButtonTable, Input, ListaContatos, Modal } from '../../components'
import ReactTable, { Column } from 'react-table-6'
import { Container, Content, Actions } from './styles'
import { Cliente, Contato } from '../../../domain/clientes/models'
import capitalize from 'capitalize-pt-br'
import { useHistory } from 'react-router-dom'

import {
  useCadastroCliente,
  useTabs,
  useAtendimentoTabs,
  useClientesFidelizados,
  useCliente,
  useOrcamentos
} from '../../hooks'
import { Empresa } from '../../../domain/empresas/models/empresa'
import { Funcionario } from '../../../domain/funcionarios/models/funcionario'
import { Orcamento, ItemOrcamento } from '../../../domain/pedidos/models'

const perPage = 30

const initialOrcamentoData: Orcamento = {
  itens: [] as ItemOrcamento[],
  total: 0,
  st: 0,
  icms: 0,
  deposito: {} as Empresa,
  contato: {} as Contato,
  funcionario: {} as Funcionario,
  funcionario2: {} as Funcionario,
  condicao: '',
  cliente: { } as Cliente,
  transportadora: {} as Cliente,
  juros: 0,
  modoPagamento: 'carteira',
  descontos: 0,
  acrescimos: 0,
  qtdeItens: 0,
  subtotal: 0
}

export const Clientes = () => {
  const history = useHistory()
  const { orcamentos, setOrcamento } = useOrcamentos()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const { setCurrentTab, setDataMode: setClienteDataMode } = useCadastroCliente()
  const { addTab } = useTabs()
  const { setCurrentTab: setCurrentTabAtendimento } = useAtendimentoTabs()
  const [showListaContatos, setShowListaContatos] = useState(false)
  const [clienteSelected, setClienteSelected] = useState<Cliente>()

  const { data: clientesFidelizados } = useClientesFidelizados({
    funcionarioId: 1007,
    currentPage: currentPage + 1,
    perPage,
    search
  })

  const { data: cliente } = useCliente(clienteSelected?.id as number)

  const handleFilterOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    setCurrentPage(0)
  }, [])

  const handleAtenderOnClick = useCallback((cliente: Cliente) => {
    setClienteSelected(cliente)

    if (orcamentos[cliente?.id as number]?.contato) {
      addTab({
        clienteId: cliente?.id as number,
        title: ` :${cliente?.razao_social as string}`,
        content: <Atendimento cliente={cliente as Cliente}/>
      })

      setCurrentTabAtendimento(cliente?.id as number, 'geral')
    } else {
      setShowListaContatos(true)
    }
  }, [addTab, orcamentos, setCurrentTabAtendimento])

  const handleEditarClienteOnClick = useCallback((cliente: Cliente) => {
    setCurrentTab('contatos')
    setClienteDataMode('edit')

    history.push({
      pathname: `/edicao-cliente/${cliente.id}`
    })
  }, [history, setClienteDataMode, setCurrentTab])

  const handleOnPageChange = useCallback((page: number) => {
    if (!clientesFidelizados?.metadata?.count) {
      return
    }

    setCurrentPage(page)
  }, [clientesFidelizados])

  const handleNovoClienteOnClick = useCallback(() => {
    history.push('/cadastro-cliente')
    setClienteDataMode('create')
  }, [history, setClienteDataMode])

  const handleCallbackListaContatos = useCallback((contato: Contato) => {
    setShowListaContatos(false)
    const orcamento = { ...initialOrcamentoData, contato }
    setOrcamento(clienteSelected?.id as number, orcamento)

    addTab({
      clienteId: clienteSelected?.id as number,
      title: clienteSelected?.razao_social as string,
      content: <Atendimento cliente={clienteSelected as Cliente}/>
    })
  }, [addTab, clienteSelected, setOrcamento])

  const columns: Column[] = useMemo(() => [
    {
      Header: '#',
      accessor: 'id',
      minWidth: 15
    },
    {
      Header: 'Razão Social',
      accessor: 'razao_social',
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'UF',
      accessor: 'uf',
      minWidth: 15,
      Cell: ({ value }) => value.toString().toUpperCase()
    },
    {
      Header: 'Cidade',
      accessor: 'cidade',
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'Ações',
      minWidth: 25,
      // eslint-disable-next-line react/display-name
      Cell: ({ row }) => {
        const cliente = row._original as Cliente
        return (
          <Actions>
            <ButtonTable
              type="button"
              typeButton='primary'
              onClick={() => handleAtenderOnClick(cliente)}
            >
              Atender
            </ButtonTable>
            <ButtonTable
              type="button"
              typeButton='secondary'
              onClick={() => handleEditarClienteOnClick(cliente)}
            >
              Editar
            </ButtonTable>
          </Actions>
        )
      }
    }
  ], [handleAtenderOnClick, handleEditarClienteOnClick])

  return (
    <MainLayout title="Clientes">
      <Container>
        <header>
          <div>
            <Input type='text' startIcon={FaSearch} onChange={handleFilterOnChange}/>
          </div>
          <div>
            <Button mode="primary"startIcon={FaUser} type="button" onClick={handleNovoClienteOnClick}>Novo cliente</Button>
          </div>
        </header>
        <Content>
          <ReactTable
            columns={columns}
            data={clientesFidelizados?.data}
            pageSize={perPage}
            page={currentPage}
            pages={clientesFidelizados?.metadata?.count && Math.ceil(clientesFidelizados?.metadata?.count / perPage)}
            onPageChange={handleOnPageChange}
            manual
            loading={!clientesFidelizados?.data}
            /*  onSortedChange={handleOnSortedChange} */
            sortable={false}
            nextText="Próximo"
            previousText="Anterior"
            pageText="Página"
            ofText= "de"
            showPageSizeOptions= { false }
            loadingText="carregando..."
            noDataText="Nenhum cliente encontrado"
            showPagination={clientesFidelizados && clientesFidelizados?.metadata?.count >= perPage}
          />
        </Content>
      </Container>
      { showListaContatos && cliente?.data && <Modal title="Selecione um contato para continuar" close={() => setShowListaContatos(false)}>
        <ListaContatos cliente={cliente?.data} callBack={handleCallbackListaContatos}/>
      </Modal>
      }
    </MainLayout>
  )
}
