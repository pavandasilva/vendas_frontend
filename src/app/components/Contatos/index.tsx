import capitalize from 'capitalize-pt-br'
import React, { useMemo, useState } from 'react'
import { FaSearch, FaUser } from 'react-icons/fa'
import ReactTable, { Column } from 'react-table-6'
import { Input, Button, ButtonTable, CheckBox } from '..'
import { Contato } from '../../../domain/clientes/models'
import { useCadastroCliente } from '../../hooks'
import { FormRow } from '../../styles/global'
import { CadastroContato } from '../CadastroContato'
import { Modal } from '../Modal'
import { Container, Actions, Header } from './styles'

const rowsPerPage = 10

export const Contatos = () => {
  const { data: cliente } = useCadastroCliente()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [showModalContato, setShowModalContato] = useState(false)

  const columns: Column[] = useMemo(() => [
    {
      Header: '#',
      accessor: 'id',
      minWidth: 15
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
      Header: 'status',
      accessor: 'status',
      minWidth: 20,
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'fiscal',
      accessor: 'fiscal',
      minWidth: 20,
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'comercial',
      accessor: 'comercial',
      minWidth: 20,
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'financeiro',
      accessor: 'financeiro',
      minWidth: 20,
      Cell: ({ value }) => capitalize(value)
    },
    {
      Header: 'Ações',
      minWidth: 25,
      // eslint-disable-next-line react/display-name
      Cell: ({ row }) => {
        const contato = row._original as Contato
        return (
          <Actions>
            <ButtonTable type="button" typeButton='secondary'>Editar</ButtonTable>
          </Actions>
        )
      }
    }
  ], [])

  const handleFilterOnChange = () => {

  }

  const handleOnPageChange = () => {

  }

  return (
    <>
      <Container>
        <Header>
          <div>
            <Input type='text' startIcon={FaSearch} onChange={handleFilterOnChange}/>
          </div>
          <div>
            <Button mode="primary"startIcon={FaUser} type="button" onClick={() => setShowModalContato(true)}>Novo contato</Button>
          </div>
        </Header>

        <ReactTable
          columns={columns}
          data={cliente?.contatos}
          pageSize={rowsPerPage}
          page={currentPage}
          pages={cliente?.contatos?.length && Math.ceil(cliente?.contatos?.length / rowsPerPage)}
          onPageChange={handleOnPageChange}
          manual
          loading={false}
          /*  onSortedChange={handleOnSortedChange} */
          sortable={false}
          nextText="Próximo"
          previousText="Anterior"
          pageText="Página"
          ofText= "de"
          showPageSizeOptions= { false }
          loadingText="carregando..."
          noDataText="Nenhum contato encontrado"
        />
      </Container>
      { showModalContato && <Modal title="Cadastro de Contato" showButtonSave close={() => setShowModalContato(false)}>
        <CadastroContato />
      </Modal> }
    </>
  )
}
