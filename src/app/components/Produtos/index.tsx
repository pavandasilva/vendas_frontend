import capitalize from 'capitalize-pt-br'
import React, { useCallback, useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import ReactTable, { Column, RowInfo } from 'react-table-6'
import Swal from 'sweetalert2'
import { Button, Modal } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { ItemOrcamento } from '../../../domain/pedidos/models'
import { formatFloatToCurrency } from '../../../helpers'
import { useAtendimentos } from '../../hooks'
import { ListaProdutos } from '../ListaProdutos'
import { Container, Header, Content } from './styles'

interface ProdutosProps {
  cliente: Cliente
}

export const Produtos = ({ cliente }: ProdutosProps) => {
  const { atendimentos, setItensOrcamento } = useAtendimentos()
  const [showProdutoModal, setShowProdutoModal] = useState(false)
  const [selectedRowTableIndex, setSelectedRowTableIndex] = useState(-1)

  const columns: Column[] = [
    {
      Header: '#',
      minWidth: 15,
      accessor: 'produto.id'
    },
    {
      Header: 'Descrição',
      accessor: 'produto.nome_popular',
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'Qtde',
      accessor: 'quantidade',
      minWidth: 20
    },
    {
      Header: 'Falta',
      minWidth: 20
    },
    {
      Header: 'Preço',
      minWidth: 20,
      accessor: 'preco.valor',
      Cell: ({ value }) => formatFloatToCurrency(value)
    },
    {
      Header: 'Valor unit.',
      minWidth: 20,
      accessor: 'valorUnitario',
      Cell: ({ value }) => formatFloatToCurrency(value)
    },
    {
      Header: 'Acres',
      minWidth: 20,
      accessor: 'acrescimo',
      Cell: ({ value }) => formatFloatToCurrency(value)
    },
    {
      Header: 'Desc',
      minWidth: 20,
      accessor: 'desconto',
      Cell: ({ value }) => formatFloatToCurrency(value)
    },
    {
      Header: 'ST',
      minWidth: 20,
      accessor: 'stTotal',
      Cell: ({ value }) => formatFloatToCurrency(value)
    },
    {
      Header: 'Total',
      minWidth: 20,
      accessor: 'total',
      Cell: ({ value }) => formatFloatToCurrency(value)
    }
  ]

  const element = useRef<HTMLDivElement>(null)

  const clickTableRowOnclick = useCallback((rowIndex: number) => {
    setSelectedRowTableIndex(rowIndex)
    element.current?.focus()
  }, [])

  const handleOnKeyDown = useCallback(async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Delete') {
      if (selectedRowTableIndex >= 0) {
        const result = await Swal.fire({
          title: 'Você deseja remover o item do pedido?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sim, remover o item do pedido!',
          cancelButtonText: 'Cancelar',
          toast: true
        })

        if (result.isConfirmed) {
          const oldItensOrcamento = atendimentos[cliente.id as number]?.orcamento?.itens
          const newItensOrcamento = oldItensOrcamento?.filter((state, index) => index !== selectedRowTableIndex)
          setItensOrcamento(cliente?.id as number, newItensOrcamento as ItemOrcamento[])
        }

        setSelectedRowTableIndex(-1)
      }
    }
  }, [atendimentos, cliente.id, selectedRowTableIndex, setItensOrcamento])

  return (
    <Container>
      <Header>
        <div>
          {/* <Input tabIndex={0} type='text' startIcon={FaSearch} onChange={handleFilterOnChange}/> */}
        </div>
        <div>
          <Button
            tabIndex={1}
            mode="confirm"
            startIcon={FaPlus}
            type="button"
            onClick={ () => setShowProdutoModal(true)}>
            Adicionar produto
          </Button>
        </div>
      </Header>
      <Content selectedRowTableIndex={selectedRowTableIndex} tabIndex={2} onKeyDown={handleOnKeyDown}>
        <ReactTable
          columns={columns}
          data={atendimentos[cliente.id as number]?.orcamento?.itens}
          pageSize={30}
          page={0}
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
                }
              }
            }

            return {}
          }}
        />
      </Content>

      { showProdutoModal && <Modal
        title='Lista de produtos'
        buttonSaveText='Adicionar produto'
        mode='fullscreen'
        close={() => setShowProdutoModal(false)}
      >
        <ListaProdutos
          cliente={cliente}
          closeModal={() => setShowProdutoModal(false)}
          afterInsertItemOrcamento={() => setShowProdutoModal(false)}
        />
      </Modal>}
    </Container>
  )
}
