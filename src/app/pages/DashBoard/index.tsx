import React, { useCallback, useMemo, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { MainLayout } from '../../layouts/MainLayout'
import { ButtonTable, Input } from '../../components'
import ReactTable, { Column } from 'react-table-6'
import { Container, Content, Actions } from './styles'
import useClientesFidelizados from '../../hooks/useClientesFidelizados'
/* import { useHistory } from 'react-router-dom' */
import { useTabs } from '../../hooks/contexts'
import { Cliente } from '../../../domain/clientes/models'
import capitalize from 'capitalize-pt-br'

const perPage = 10

export const DashBoard = () => {
  /*  const history = useHistory() */

  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const { addTab } = useTabs()

  const { data: clientesFidelizados } = useClientesFidelizados({
    funcionarioId: 1007,
    currentPage: currentPage + 1,
    perPage,
    search
  })

  const handleFilterOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }, [])

  const handleAtenderOnClick = useCallback((cliente: Cliente) => {
    if (!cliente?.id) {

    }

    addTab({
      index: cliente.id as number,
      title: `${cliente.id} - ${cliente.nome_fantasia}`,
      content: <div>Ola</div>
    })
  }, [addTab])

  const handleOnPageChange = useCallback((page: number) => {
    if (!clientesFidelizados?.metadata?.count) {
      return
    }

    setCurrentPage(page)
  }, [clientesFidelizados])

  /*   const handleClickNovoCLiente = useCallback(() => {
    history.push('/cadastro-cliente')
  }, [history])

  const handleOnSortedChange = (state: any, instance: any) => {
    console.log('state', state)
    console.log('instance', instance)
  } */

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
            <ButtonTable type="button" typeButton='primary' onClick={() => handleAtenderOnClick(cliente)}>Atender</ButtonTable>
            <ButtonTable type="button" typeButton='secondary'>Editar</ButtonTable>
          </Actions>
        )
      }
    }
  ], [handleAtenderOnClick])

  return (
    <MainLayout title="DashBoard">
      <Container>
        <header>
          <div>
            <Input type='text' startIcon={FaSearch} onChange={handleFilterOnChange}/>
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

          />
        </Content>
      </Container>
    </MainLayout>
  )
}
