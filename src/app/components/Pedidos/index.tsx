import capitalize from 'capitalize-pt-br'
import React, { useMemo, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import ReactTable, { Column } from 'react-table-6'
import { Input } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { Container, Content } from './styles'

const perPage = 30

interface PedidosProps {
  cliente: Cliente
}

export const Pedidos = ({ cliente }: PedidosProps) => {
  const [pedidosCliente] = useState([] as any)
  const [currentPage] = useState(1)

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
      minWidth: 25
    }
  ], [])

  const handleFilterOnChange = () => {

  }

  const handleOnPageChange = () => {

  }

  return (
    <Container>
      <header>
        <div>
          <Input type='text' startIcon={FaSearch} onChange={handleFilterOnChange}/>
        </div>
      </header>
      <Content>
        <ReactTable
          columns={columns}
          data={pedidosCliente?.data}
          pageSize={perPage}
          page={currentPage}
          pages={pedidosCliente?.metadata?.count && Math.ceil(pedidosCliente?.metadata?.count / perPage)}
          onPageChange={handleOnPageChange}
          manual
          loading={!pedidosCliente?.data}
          /*  onSortedChange={handleOnSortedChange} */
          sortable={false}
          nextText="Próximo"
          previousText="Anterior"
          pageText="Página"
          ofText= "de"
          showPageSizeOptions= { false }
          loadingText="carregando..."
          noDataText="Nenhum pedido encontrado"
        />
      </Content>
    </Container>
  )
}
