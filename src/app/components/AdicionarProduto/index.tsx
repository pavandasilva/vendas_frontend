import capitalize from 'capitalize-pt-br'
import React, { useMemo, useState } from 'react'
import ReactTable, { Column } from 'react-table-6'
import useProdutos from '../../hooks/useProdutos'

import { Container } from './styles'

const perPage = 30

export const AdicionarProduto = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')

  const { data: produtos } = useProdutos({
    perPage,
    currentPage,
    search
  })

  const columns: Column[] = useMemo(() => [
    {
      Header: '#',
      accessor: 'id',
      minWidth: 15
    },
    {
      Header: 'Nome popular',
      accessor: 'nome_popular',
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'Nome técnico',
      accessor: 'nome_tecnico',
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'Marca',
      accessor: 'marca',
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'Volume',
      accessor: 'volume',
      minWidth: 15,
      Cell: ({ value }) => value.toString().toUpperCase()
    },
    {
      Header: 'Qtde Volume',
      accessor: 'qtde_volume',
      minWidth: 15,
      Cell: ({ value }) => value.toString().toUpperCase()
    },
    {
      Header: 'Unidade',
      accessor: 'unidade',
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'Peso líquido',
      accessor: 'peso_liquido',
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'Peso bruto',
      accessor: 'peso_bruto',
      minWidth: 15,
      Cell: ({ value }) => value.toString().toUpperCase()
    },
    {
      Header: 'Ações',
      minWidth: 25
    }
  ], [])

  return (
    <Container>
      <ReactTable
        columns={columns}
        data={produtos?.data}
        sortable={false}
        nextText="Próximo"
        previousText="Anterior"
        pageText="Página"
        ofText= "de"
        showPageSizeOptions= { false }
        loadingText="carregando..."
        noDataText="Nenhum produto encontrado"
      />
    </Container>)
}
