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
  useAtendimentos,
  useFuncionario,
  useUsuario
} from '../../hooks'
import { Funcionario } from '../../../domain/funcionarios/models/funcionario'

const perPage = 30

export const Clientes = () => {
  const history = useHistory()
  const { atendimentos, startAtendimento } = useAtendimentos()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const { setCurrentTab, setDataMode: setClienteDataMode } = useCadastroCliente()
  const { addTab } = useTabs()
  const { setCurrentTab: setCurrentTabAtendimento } = useAtendimentoTabs()
  const [showListaContatos, setShowListaContatos] = useState(false)
  const [clienteSelected, setClienteSelected] = useState<Cliente>()

  const { data: clientesFidelizados } = useClientesFidelizados({
    // funcionarioId: usuario?.funcionario_id
    funcionarioId: 1007,
    currentPage: currentPage + 1,
    perPage,
    search
  })

  const { data: cliente } = useCliente(clienteSelected?.id as number)
  const { data: usuario } = useUsuario()
  const { data: funcionario } = useFuncionario(usuario?.funcionario_id as unknown as number)

  const handleFilterOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    setCurrentPage(0)
  }, [])

  const handleAtenderOnClick = useCallback((cliente: Cliente) => {
    setClienteSelected(cliente)

    if (atendimentos[cliente?.id as number] && Object.keys(atendimentos[cliente?.id as number]).length) {
      addTab({
        clienteId: cliente?.id as number,
        title: `${cliente?.id}-${cliente?.razao_social as string}`,
        content: <Atendimento cliente={cliente as Cliente}/>
      })

      setCurrentTabAtendimento(cliente?.id as number, 'geral')
    } else {
      setShowListaContatos(true)
    }
  }, [addTab, atendimentos, setCurrentTabAtendimento])

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
    startAtendimento(clienteSelected?.id as number, contato, funcionario?.data as Funcionario)

    addTab({
      clienteId: clienteSelected?.id as number,
      title: `${clienteSelected?.id} - ${clienteSelected?.razao_social as string} `,
      content: <Atendimento cliente={clienteSelected as Cliente}/>
    })
    setCurrentTabAtendimento(clienteSelected?.id as number, 'geral')
  }, [addTab, clienteSelected, funcionario, setCurrentTabAtendimento, startAtendimento])

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
      { showListaContatos && cliente?.data && (
        <Modal title="Selecione um contato para continuar" close={() => setShowListaContatos(false)}>
          <ListaContatos cliente={cliente?.data} callBack={handleCallbackListaContatos}/>
        </Modal>
      )}
    </MainLayout>
  )
}