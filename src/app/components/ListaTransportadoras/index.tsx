import capitalize from 'capitalize-pt-br'
import React, { useCallback, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import ReactTable, { Column, RowInfo } from 'react-table-6'
import { Input, InputF2 } from '..'
import { Empresa } from '../../../domain/empresas/models/empresa'
import useTransportadoras from '../../hooks/useTransportadoras'
import { Container, Header, Content, TextCenter } from './styles'

const rowsPerPage = 10

interface ListaTransportadorasProps extends InputF2 {
}

export const ListaTransportadoras = ({ close, callBack }: ListaTransportadorasProps) => {
/*   const [empresasFiltered, setTransportadorasFiltered] = useState<Contato[]>(cliente?.Transportadoras as Contato[]) */
  const [search, setSearch] = useState('')
  const [selectedRowTableIndex, setSelectedRowTableIndex] = useState(-1)
  const [currentPage, setCurrentPage] = useState(1)

  const { data: transportadoras } = useTransportadoras({
    currentPage,
    perPage: rowsPerPage,
    search
  })

  const columns: Column[] = [
    {
      Header: '#',
      accessor: 'id',
      minWidth: 20
    },
    {
      Header: 'Fantasia',
      accessor: 'nome_fantasia',
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'CNPJ/CPF',
      accessor: 'cnpj',
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'E-mail',
      accessor: 'email',
      Cell: ({ value }) => value.toString().toLowerCase()
    },
    {
      Header: 'Cidade',
      accessor: 'cidade',
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'UF',
      accessor: 'uf',
      minWidth: 20,
      Cell: ({ value }) => value.toString().toUpperCase()
    },
    {
      Header: 'Status',
      accessor: 'status',
      minWidth: 20,
      // eslint-disable-next-line react/display-name
      Cell: ({ value }) => <TextCenter status={value}>{value.toString().toUpperCase()}</TextCenter>
    }
  ]

  const clickTableRowOnclick = useCallback((rowIndex: number) => {
    setSelectedRowTableIndex(rowIndex)
  }, [])

  const dbClickTableRowOnclick = (empresa: Empresa) => {
    callBack && callBack(empresa)
    close && close()
  }

  const handleOnPageChange = useCallback((page: number) => {
    if (!transportadoras?.metadata?.count) {
      return
    }

    setCurrentPage(page)
    setSelectedRowTableIndex(-1)
  }, [transportadoras])

  const handleFilterOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    setCurrentPage(1)
    setSelectedRowTableIndex(-1)
  }, [])

  return <Container>
    <Header>
      <div>
        <Input type='text' startIcon={FaSearch} onChange={handleFilterOnChange}/>
      </div>

    </Header>
    <Content selectedRowTableIndex={selectedRowTableIndex}>
      <ReactTable
        page={currentPage - 1}
        pages={transportadoras?.metadata?.count && Math.ceil(transportadoras?.metadata?.count / rowsPerPage)}
        onPageChange={handleOnPageChange}
        manual
        loading={!transportadoras?.data}
        columns={columns}
        data={transportadoras?.data}
        pageSize={rowsPerPage}
        sortable={true}
        showPageSizeOptions= { false }
        loadingText="carregando..."
        noDataText="Nenhuma transportadora encontrada"
        nextText= 'Próximo'
        ofText='de'
        previousText='Anterior'
        showPagination={!!transportadoras?.metadata?.count && transportadoras?.metadata?.count >= rowsPerPage}
        pageText= 'Página'
        getTrProps={(finalState: any, rowInfo?: RowInfo, column?: undefined, instance?: any) => {
          if (rowInfo) {
            return {
              onClick: () => {
                clickTableRowOnclick(rowInfo?.index)
              },
              onDoubleClick: () => {
                dbClickTableRowOnclick(rowInfo.row?._original as Empresa)
              }
            }
          }

          return {}
        }}
      />
    </Content>
  </Container>
}
