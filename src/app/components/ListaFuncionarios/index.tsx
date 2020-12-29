import capitalize from 'capitalize-pt-br'
import React, { useCallback, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import ReactTable, { Column, RowInfo } from 'react-table-6'
import { Input, InputF2 } from '..'
import { Funcionario } from '../../../domain/funcionarios/models/funcionario'
import { useFuncionarios } from '../../hooks'
import { TextStatus } from '../../styles/global'
import { Container, Header, Content } from './styles'

const rowsPerPage = 10

interface ListaFuncionariosProps extends InputF2 {
}

export const ListaFuncionarios = ({ close, callBack }: ListaFuncionariosProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [selectedRowTableIndex, setSelectedRowTableIndex] = useState(-1)
  const [currentPage, setCurrentPage] = useState(0)

  const { data: funcionarios } = useFuncionarios({
    perPage: rowsPerPage,
    currentPage: currentPage + 1,
    search: searchValue
  })

  const columns: Column[] = [
    {
      Header: '#',
      accessor: 'id',
      minWidth: 20
    },
    {
      Header: 'Nome',
      accessor: 'nome',
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'E-mail',
      accessor: 'email',
      Cell: ({ value }) => value.toString().toLowerCase()
    },
    {
      Header: 'Status',
      accessor: 'status',
      minWidth: 25,
      // eslint-disable-next-line react/display-name
      Cell: ({ value }) => <TextStatus status={value}>{value.toString().toUpperCase()}</TextStatus>
    }
  ]

  const clickTableRowOnclick = useCallback((rowIndex: number) => {
    setSelectedRowTableIndex(rowIndex)
  }, [])

  const dbClickTableRowOnclick = (funcionario: Funcionario) => {
    callBack && callBack(funcionario)
    close && close()
  }

  const handleOnPageChange = useCallback((page: number) => {
    if (!funcionarios?.metadata?.count) {
      return
    }

    setCurrentPage(page)
    setSelectedRowTableIndex(-1)
  }, [funcionarios])

  const handleFilterOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
    setCurrentPage(0)
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
        page={currentPage}
        pages={funcionarios?.metadata?.count && Math.ceil(funcionarios?.metadata?.count / rowsPerPage)}
        onPageChange={handleOnPageChange}
        manual
        loading={!funcionarios?.data}
        columns={columns}
        data={funcionarios?.data}
        pageSize={rowsPerPage}
        sortable={true}
        showPageSizeOptions= { false }
        loadingText="carregando..."
        noDataText="Nenhum funcionário encontrado"
        nextText= 'Próximo'
        ofText='de'
        previousText='Anterior'
        showPagination={!!funcionarios?.metadata?.count && funcionarios?.metadata?.count >= rowsPerPage}
        pageText= 'Página'
        getTrProps={(finalState: any, rowInfo?: RowInfo, column?: undefined, instance?: any) => {
          if (rowInfo) {
            return {
              onClick: () => {
                clickTableRowOnclick(rowInfo?.index)
              },
              onDoubleClick: () => {
                dbClickTableRowOnclick(rowInfo.row?._original as Funcionario)
              }
            }
          }

          return {}
        }}
      />
    </Content>
  </Container>
}
