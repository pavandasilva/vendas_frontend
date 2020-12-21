import capitalize from 'capitalize-pt-br'
import React, { useMemo, useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import ReactTable, { Column } from 'react-table-6'
import { Input, Button, Modal } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { useAtendimentoCliente } from '../../hooks/useAtendimentoCliente'
import { AdicionarProduto } from '../AdicionarProduto'
import { Container, Header, Content } from './styles'

interface ProdutosProps {
  cliente: Cliente
}

export const Produtos = ({ cliente }: ProdutosProps) => {
  const { pedidos } = useAtendimentoCliente()
  const [showProdutoModal, setShowProdutoModal] = useState(false)

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
            onClick={ () => setShowProdutoModal(true)}>
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

      {showProdutoModal && <Modal
        title='Lista de produtos'
        buttonSaveText='Adicionar produto'
        mode='fullscreen'
        close={() => setShowProdutoModal(false)}
      >
        <AdicionarProduto />
      </Modal>}
    </Container>
  )
}
