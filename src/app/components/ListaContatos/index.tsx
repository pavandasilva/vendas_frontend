import capitalize from 'capitalize-pt-br'
import React, { useCallback, useEffect, useState } from 'react'
import { FaCheck, FaSearch } from 'react-icons/fa'
import ReactTable, { Column, RowInfo } from 'react-table-6'
import { Input, InputF2 } from '..'
import { Cliente, Contato } from '../../../domain/clientes/models'
import { StatusText } from '../../styles/global'
import { TableCenterContent } from '../Contatos/styles'
import { Container, Header, Content } from './styles'

const rowsPerPage = 10

interface ListaContatosProps extends InputF2 {
  cliente: Cliente
}

export const ListaContatos = ({ cliente, close, callBack }: ListaContatosProps) => {
  const [contatosFiltered, setContatosFiltered] = useState<Contato[]>(cliente?.contatos as Contato[])
  const [searchValue, setSearchValue] = useState('')
  const [selectedRowTableIndex, setSelectedRowTableIndex] = useState(-1)

  useEffect(() => {
    const contatos = cliente?.contatos?.filter(contato => {
      let result = false

      if (contato.email?.toLowerCase().includes(searchValue.toLowerCase())) {
        result = true
      }

      if (contato.nome?.toLowerCase().includes(searchValue.toLowerCase())) {
        result = true
      }

      return result
    })

    contatos?.length && setContatosFiltered(contatos)
  }, [cliente.contatos, searchValue])

  const columns: Column[] = [
    {
      Header: '#',
      accessor: 'id',
      minWidth: 40
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
      minWidth: 30,
      // eslint-disable-next-line react/display-name
      Cell: ({ value }) => {
        return <TableCenterContent><StatusText status={value}>{capitalize(value)}</StatusText></TableCenterContent>
      }
    },
    {
      Header: 'Fiscal',
      accessor: 'fiscal',
      minWidth: 30,
      Cell: ({ value }) => {
        if (value === 's') {
          return <TableCenterContent><FaCheck /></TableCenterContent>
        } else {
          return ''
        }
      }
    },
    {
      Header: 'Comercial',
      accessor: 'comercial',
      minWidth: 50,
      Cell: ({ value }) => {
        if (value === 's') {
          return <TableCenterContent><FaCheck /></TableCenterContent>
        } else {
          return ''
        }
      }
    },
    {
      Header: 'Financeiro',
      accessor: 'financeiro',
      minWidth: 50,
      Cell: ({ value }) => {
        if (value === 's') {
          return <TableCenterContent><FaCheck /></TableCenterContent>
        } else {
          return ''
        }
      }
    }
  ]

  const clickTableRowOnclick = useCallback((rowIndex: number) => {
    setSelectedRowTableIndex(rowIndex)
  }, [])

  const dbClickTableRowOnclick = (contato: Contato) => {
    callBack && callBack(contato)
    close && close()
  }

  return (
    <Container>
      <Header>
        <div>
          <Input type='text' startIcon={FaSearch} onChange={(e) => setSearchValue(e.currentTarget.value)}/>
        </div>

      </Header>
      <Content selectedRowTableIndex={selectedRowTableIndex}>
        <ReactTable
          columns={columns}
          data={searchValue !== '' ? contatosFiltered : cliente?.contatos}
          pageSize={rowsPerPage}
          sortable={true}
          showPageSizeOptions= { false }
          loadingText="carregando..."
          noDataText="Nenhum contato cadastrado"
          nextText= 'Próximo'
          ofText='de'
          previousText='Anterior'
          showPagination={cliente && cliente.contatos && cliente.contatos?.length >= rowsPerPage}
          pageText= 'Página'
          getTrProps={(finalState: any, rowInfo?: RowInfo, column?: undefined, instance?: any) => {
            if (rowInfo) {
              return {
                onClick: () => {
                  clickTableRowOnclick(rowInfo?.index)
                },
                onDoubleClick: () => {
                  dbClickTableRowOnclick(rowInfo.row?._original as Contato)
                }
              }
            }

            return {}
          }}
        />
      </Content>
    </Container>
  )
}
