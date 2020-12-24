import capitalize from 'capitalize-pt-br'
import React, { useCallback, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import ReactTable, { Column, RowInfo } from 'react-table-6'
import { Input, InputF2 } from '..'
import { Empresa } from '../../../domain/empresas/models/empresa'
import useEmpresas from '../../hooks/useEmpresas'
import { Container, Header, Content } from './styles'

const rowsPerPage = 10

interface ListaEmpresasProps extends InputF2 {
}

export const ListaEmpresas = ({ close, callBack }: ListaEmpresasProps) => {
/*   const [empresasFiltered, setEmpresasFiltered] = useState<Contato[]>(cliente?.Empresas as Contato[]) */
  const [searchValue, setSearchValue] = useState('')
  const [selectedRowTableIndex, setSelectedRowTableIndex] = useState(-1)
  const [currentPage, setCurrentPage] = useState(0)

  const { data: empresas } = useEmpresas({
    perPage: rowsPerPage,
    currentPage: currentPage + 1,
    search: searchValue
  })

  /*  useEffect(() => {
    const Empresas = cliente?.Empresas?.filter(contato => {
      let result = false

      if (contato.email?.toLowerCase().includes(searchValue.toLowerCase())) {
        result = true
      }

      if (contato.nome?.toLowerCase().includes(searchValue.toLowerCase())) {
        result = true
      }

      return result
    })

    Empresas?.length && setEmpresasFiltered(Empresas)
  }, [cliente.Empresas, searchValue]) */

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
      Header: 'Cidade',
      accessor: 'cidade',
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'UF',
      accessor: 'uf',
      minWidth: 20,
      Cell: ({ value }) => value.toString().toUpperCase()
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
    if (!empresas?.metadata?.count) {
      return
    }

    setCurrentPage(page)
    setSelectedRowTableIndex(-1)
  }, [empresas])

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
        pages={empresas?.metadata?.count && Math.ceil(empresas?.metadata?.count / rowsPerPage)}
        onPageChange={handleOnPageChange}
        manual
        loading={!empresas?.data}
        columns={columns}
        data={empresas?.data}
        pageSize={rowsPerPage}
        sortable={true}
        showPageSizeOptions= { false }
        loadingText="carregando..."
        noDataText="Nenhum depósito encontrado"
        nextText= 'Próximo'
        ofText='de'
        previousText='Anterior'
        showPagination={!!empresas?.metadata?.count && empresas?.metadata?.count >= rowsPerPage}
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
