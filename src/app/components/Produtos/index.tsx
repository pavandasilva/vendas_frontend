import capitalize from 'capitalize-pt-br'
import React, { useMemo } from 'react'
import { FaSearch, FaPlus } from 'react-icons/fa'
import ReactTable, { Column } from 'react-table-6'
import { Input, Button } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { useAtendimentoCliente } from '../../hooks/useAtendimentoCliente'
import { Container, Header, Content } from './styles'

interface ProdutosProps {
  cliente: Cliente
}

export const Produtos = ({ cliente }: ProdutosProps) => {
  const { pedidos } = useAtendimentoCliente()

  const columns: Column[] = useMemo(() => [
    {
      Header: '#',
      accessor: 'id',
      minWidth: 10
    },
    {
      Header: 'Qtde',
      accessor: 'quantidade',
      minWidth: 14
    },
    {
      Header: 'Unidade',
      accessor: 'unidade',
      minWidth: 18
    },
    {
      Header: 'Nome popular',
      accessor: 'nome_popular',
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'Nome técnico',
      accessor: 'nome_tecnico',
      Cell: ({ value }) => value.toString().toUpperCase()
    },
    {
      Header: 'Marca',
      accessor: 'marca',
      Cell: ({ value }) => value.toString().toUpperCase(),
      minWidth: 30
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => capitalize(value),
      minWidth: 17
    }
  ], [])

  const handleFilterOnChange = () => {

  }

  const handleOnPageChange = () => {

  }

  const handleAdicionarProdutoOnClick = () => {

  }

  return (
    <Container>
      <Header>
        <div>
          <Input type='text' startIcon={FaSearch} onChange={handleFilterOnChange}/>
        </div>
        <div>
          <Button
            mode="confirm"
            startIcon={FaPlus}
            type="button"
            onClick={ handleAdicionarProdutoOnClick}>
            Adicionar produto
          </Button>
        </div>
      </Header>
      <Content>
        <ReactTable
          columns={columns}
          data={pedidos[cliente.id as number]?.itens}
          sortable={false}
          nextText="Próximo"
          previousText="Anterior"
          pageText="Página"
          ofText= "de"
          showPageSizeOptions= { false }
          loadingText="carregando..."
          noDataText="Nenhum item no orçamento"
        />
      </Content>
    </Container>
  )
}
