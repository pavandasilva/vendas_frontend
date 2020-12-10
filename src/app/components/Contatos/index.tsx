import capitalize from 'capitalize-pt-br'
import { produce } from 'immer'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FaSearch, FaUser } from 'react-icons/fa'
import ReactTable, { Column } from 'react-table-6'
import { Input, Button, ButtonTable } from '..'
import { Contato } from '../../../domain/clientes/models'
import { useCadastroCliente } from '../../hooks'
import { useCadastroContato } from '../../hooks/useCadastroContato'
import { CadastroContato } from '../CadastroContato'
import { Modal } from '../Modal'
import { Container, Actions, Header } from './styles'

const rowsPerPage = 5

export const Contatos = () => {
  const { data: cliente, setData: setCliente } = useCadastroCliente()
  const { data: contato, resetData: resetContato } = useCadastroContato()
  const [currentPage] = useState(0)
  const [showModalContato, setShowModalContato] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [contatos, setContatos] = useState<Contato[]>([] as Contato[])

  useEffect(() => {
    setContatos(cliente?.contatos as Contato [])
  }, [cliente])

  useEffect(() => {
    const newContatos = cliente?.contatos?.filter(contato => {
      if (contato?.email?.includes(searchValue)) {
        return true
      }
      if (contato?.nome?.includes(searchValue)) {
        return true
      } else {
        return false
      }
    })

    setContatos(newContatos as Contato[])
  }, [searchValue, cliente])

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
        return (
          <Actions>
            <ButtonTable type="button" typeButton='secondary'>Editar</ButtonTable>
          </Actions>
        )
      }
    }
  ], [])

  const handleOnPageChange = () => {

  }

  const handleModalCadastroOnSave = useCallback(() => {
    if (!contato) {
      return
    }

    setShowModalContato(false)

    const newCliente = produce(cliente, draftState => {
      draftState?.contatos?.push(contato as Contato)
    })

    setCliente(newCliente)
    resetContato()
  }, [cliente, contato, resetContato, setCliente])

  return (
    <>
      <Container>
        <Header>
          <div>
            <Input type='text' startIcon={FaSearch} onChange={(e) => setSearchValue(e.currentTarget.value)}/>
          </div>
          <div>
            <Button mode="primary"startIcon={FaUser} type="button" onClick={() => setShowModalContato(true)}>Novo contato</Button>
          </div>
        </Header>

        <ReactTable
          columns={columns}
          data={contatos}
          pageSize={rowsPerPage}
          page={currentPage}
          pages={contatos?.length && Math.ceil(contatos?.length / rowsPerPage)}
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
      { showModalContato && <Modal title="Cadastro de Contato" close={() => setShowModalContato(false)} onSave={handleModalCadastroOnSave} showButtonSave>
        <CadastroContato/>
      </Modal> }
    </>
  )
}
