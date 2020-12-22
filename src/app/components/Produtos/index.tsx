import capitalize from 'capitalize-pt-br'
import React, { ChangeEvent, useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import ReactTable, { Column } from 'react-table-6'
import { Input, Button, Modal } from '..'
import { Cliente } from '../../../domain/clientes/models'
import { useOrcamentos } from '../../hooks/useOrcamentos'
import { AdicionarProduto } from '../AdicionarProduto'
import { Container, Header, Content } from './styles'

interface ProdutosProps {
  cliente: Cliente
}

export const Produtos = ({ cliente }: ProdutosProps) => {
  const { orcamentos } = useOrcamentos()
  const [showProdutoModal, setShowProdutoModal] = useState(false)

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
          data={orcamentos[cliente.id as number]}
          pageSize={30}
          page={0}
          sortable={false}
          nextText="Próximo"
          previousText="Anterior"
          pageText="Página"
          ofText= "de"
          showPageSizeOptions= { false }
          loadingText="carregando..."
          noDataText="Nenhum cliente encontrado"

        />
      </Content>

      {showProdutoModal && <Modal
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
