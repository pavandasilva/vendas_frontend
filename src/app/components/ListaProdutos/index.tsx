import capitalize from 'capitalize-pt-br'
import React, { useCallback, useMemo, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import ReactTable, { Column, RowInfo } from 'react-table-6'
import Swal from 'sweetalert2'
import { Input } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { ItemOrcamento } from '../../../domain/clientes/models/itemOrcamento'
import { Empresa } from '../../../domain/empresas/models/empresa'
import { makeTrazerPrecoProduto } from '../../../domain/produtos/factories/makeTrazerPrecoProduto'
import { Produto } from '../../../domain/produtos/models/produto'
import { useOrcamentos, useProdutos, useUsuario } from '../../hooks'
import { Container, Header } from './styles'

const trazerPrecoProduto = makeTrazerPrecoProduto()
const perPage = 30

interface ListaProdutosProps {
  closeModal: () => void
  cliente: Cliente
  empresa: Empresa
}

export const ListaProdutos = ({ closeModal, cliente, empresa }: ListaProdutosProps) => {
  const [selectedRowTableIndex, setSelectedRowTableIndex] = useState(-1)
  const { orcamentos, setItensOrcamento } = useOrcamentos()
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState('')
  const { data: usuario } = useUsuario()

  const columns: Column[] = useMemo(() => [
    {
      Header: '#',
      accessor: 'id',
      minWidth: 17
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
      minWidth: 30,
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'Volume',
      accessor: 'volume',
      minWidth: 30,
      Cell: ({ value }) => value.toString().toUpperCase()
    },
    {
      Header: 'Qtde Volume',
      accessor: 'qtde_volume',
      minWidth: 30,
      Cell: ({ value }) => value.toString().toUpperCase()
    },
    {
      Header: 'Unidade',
      accessor: 'unidade',
      minWidth: 30,
      Cell: ({ value }) => value.toUpperCase()
    },
    {
      Header: 'Peso líquido',
      accessor: 'peso_liquido',
      Cell: ({ value }) => capitalize(value),
      minWidth: 30
    },
    {
      Header: 'Peso bruto',
      accessor: 'peso_bruto',
      minWidth: 30,
      Cell: ({ value }) => value.toString().toUpperCase()
    }
  ], [])

  const { data: produtos } = useProdutos({
    perPage,
    currentPage: currentPage + 1,
    search
  })

  const handleFilterOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    setCurrentPage(0)
    setSelectedRowTableIndex(-1)
  }, [])

  const handleOnPageChange = useCallback((page: number) => {
    if (!produtos?.metadata?.count) {
      return
    }

    setCurrentPage(page)
    setSelectedRowTableIndex(-1)
  }, [produtos])

  const clickTableRowOnclick = (rowIndex: number) => {
    setSelectedRowTableIndex(rowIndex)
  }

  const dbClickTableRowOnclick = (produto: Produto) => {
    Swal.queue([{
      title: `${produto?.id} - ${produto.nome_popular}`,
      confirmButtonText: 'Adicionar ao orçamento',
      cancelButtonText: 'Cancelar',
      text: 'Quantidade:',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off',
        placeHolder: 'Quantidade',
        min: '1'
      },
      showLoaderOnConfirm: true,
      showCancelButton: true,

      preConfirm: async (result) => {
        const preco = await trazerPrecoProduto.execute(
          usuario?.token as string,
          produto.id as number,
          cliente.id as number,
          empresa.id as number
        )

        const newItemOrcamento: ItemOrcamento = {
          produto,
          quantidade: result,
          preco
        }

        const itensOrcamento = [...orcamentos[cliente?.id as number].itens, newItemOrcamento]
        setItensOrcamento(cliente?.id as number, itensOrcamento)
        closeModal()
      }
    }])
  }

  return (
    <Container selectedRowTableIndex={selectedRowTableIndex}>
      <Header>
        <div>
          <Input type='text' startIcon={FaSearch} onChange={handleFilterOnChange} />
        </div>
      </Header>
      <ReactTable
        columns={columns}
        data={produtos?.data}
        pageSize={perPage}
        page={currentPage}
        pages={produtos?.metadata?.count && Math.ceil(produtos?.metadata?.count / perPage)}
        onPageChange={handleOnPageChange}
        manual
        loading={!produtos?.data}
        /*  onSortedChange={handleOnSortedChange} */
        sortable={false}
        nextText="Próximo"
        previousText="Anterior"
        pageText="Página"
        ofText= "de"
        showPageSizeOptions= { false }
        loadingText="carregando..."
        noDataText="Nenhum produto encontrado"
        getTrProps={(finalState: any, rowInfo?: RowInfo, column?: undefined, instance?: any) => {
          if (rowInfo) {
            return {
              onClick: () => {
                clickTableRowOnclick(rowInfo?.index)
              },
              onDoubleClick: () => {
                dbClickTableRowOnclick(rowInfo.row?._original as Produto)
              }
            }
          }

          return {}
        }}
      />
    </Container>)
}
