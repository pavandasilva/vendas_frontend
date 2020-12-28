import capitalize from 'capitalize-pt-br'
import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import ReactTable, { Column, RowInfo } from 'react-table-6'
import { useTheme } from 'styled-components'
import Swal from 'sweetalert2'
import { Input, Button, Modal } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { useOrcamentos } from '../../hooks/useOrcamentos'
import { AdicionarProduto } from '../AdicionarProduto'
import { Container, Header, Content } from './styles'

interface ProdutosProps {
  cliente: Cliente
}

export const Produtos = ({ cliente }: ProdutosProps) => {
  const { orcamentos, setItensOrcamento } = useOrcamentos()
  const [showProdutoModal, setShowProdutoModal] = useState(false)
  const [selectedRowTableIndex, setSelectedRowTableIndex] = useState(-1)
  const { colors } = useTheme()

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
      minWidth: 20
    },
    {
      Header: 'Valor unit.',
      minWidth: 20
    },
    {
      Header: 'Acres',
      minWidth: 20
    },
    {
      Header: 'Desc',
      minWidth: 20
    },
    {
      Header: 'ST',
      minWidth: 20
    },
    {
      Header: 'Total',
      minWidth: 20
    }
  ]

  const handleFilterOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    /*  const filter = e.currentTarget.value

    const filtered = orcamentos[cliente.id as number].filter(item => {
      if (item?.produto?.marca?.includes(filter)) {
        return true
      } else if (item?.produto?.nome_popular?.includes(filter)) {
        return true
      } else if (item?.produto?.nome_tecnico?.includes(filter)) {
        return true
      } else {
        return false
      }
    })

    setFiltered(filtered) */
  }

  const element = useRef<HTMLDivElement>(null)

  const clickTableRowOnclick = (rowIndex: number) => {
    setSelectedRowTableIndex(rowIndex)
    element.current?.focus()
  }

  const handleOnKeyPress = useCallback(async (e: React.KeyboardEvent<HTMLDivElement>) => {
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
          const oldItensOrcamento = orcamentos[cliente.id as number].itens
          const newItensOrcamento = oldItensOrcamento?.filter((state, index) => index !== selectedRowTableIndex)
          setItensOrcamento(cliente?.id as number, newItensOrcamento)
        }

        setSelectedRowTableIndex(-1)
      }
    }
  }, [cliente.id, orcamentos, selectedRowTableIndex, setItensOrcamento])

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
      <Content selectedRowTableIndex={selectedRowTableIndex} tabIndex={2} onKeyPress={handleOnKeyPress}>
        <ReactTable
          columns={columns}
          data={orcamentos[cliente.id as number]?.itens}
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
        <AdicionarProduto cliente={cliente} closeModal={() => setShowProdutoModal(false)}/>
      </Modal>}
    </Container>
  )
}
