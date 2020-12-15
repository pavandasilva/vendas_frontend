/* eslint-disable react/display-name */
import capitalize from 'capitalize-pt-br'
import { FaWhatsapp, FaPhone, FaUser, FaCheck } from 'react-icons/fa'
import { produce } from 'immer'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReactTable, { Column } from 'react-table-6'
import { Button, ButtonTable, CadastroContato, CadastroTelefone } from '..'
import { Contato, Telefone } from '../../../domain/clientes/models'
import { useCadastroCliente, useCadastroTelefone } from '../../hooks'
import { useCadastroContato } from '../../hooks/useCadastroContato'
import { StatusText } from '../../styles/global'
import { Modal } from '../Modal'
import { Container, Actions, Header, TableCenterContent, ListaTelefones, Content, ToolTip, Error, TableCollumn } from './styles'
import { useTheme } from 'styled-components'

const rowsPerPage = 10

export const Contatos = () => {
  const { data: cliente, setData: setCliente, dataError: clienteError, setDataError: setClienteError } = useCadastroCliente()
  const { data: contato, resetData: resetContato } = useCadastroContato()
  const { data: telefone, resetData: resetTelefone } = useCadastroTelefone()
  const theme = useTheme()
  const [currentPage] = useState(0)
  const [showModalContato, setShowModalContato] = useState(false)
  const [showModalTelefone, setShowModalTelefone] = useState(false)
  const [searchValue] = useState('')
  const [contatos, setContatos] = useState<Contato[]>([] as Contato[])
  const [contatoIndexSelected, setContatoIndexSelected] = useState(-1)
  const [contatosError, setContatosError] = useState({} as any)

  useEffect(() => {
    console.log(clienteError)

    if (!Object.keys(clienteError).length) {
      return
    }

    let contatosError: { [x: string]: any }[] = []

    Object.keys(clienteError).filter((keyName, key) => {
      if (keyName.includes('contatos[')) {
        contatosError.push(clienteError[keyName])
      }
    })
    let obj: any = {}

    contatosError.map(error => {
      let e = error.split('.', 1)[0]?.split(']', 1)[0]?.split('[')[1]
      const filtered = contatosError.filter(value => {
        return value.includes(`[${e}]`)
      })

      filtered.map(str => {
        const property = str.split('].', 2)[1].split(' ', 1)[0]
        const [, data] = str.split(`[${e}].`, 2)
        obj[e] = { ...obj[e], [property]: data }
      })
    })

    setContatosError(obj)
  }, [clienteError])

  const handleAdicionarContatoOnClick = useCallback((contatoListindex: number) => {
    setContatoIndexSelected(contatoListindex)
    setShowModalTelefone(true)
  }, [])

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
      Header: 'Nome',
      accessor: 'nome',
      Cell: ({ value, index }) => (
        <TableCollumn hasError={!!contatosError[index]?.nome}>
          <span>{capitalize(value)}</span>
          {contatosError[index]?.nome && <ToolTip>{contatosError[index]?.nome}</ToolTip>}
        </TableCollumn>
      )
    },
    {
      Header: 'E-mail',
      accessor: 'email',
      Cell: ({ value, index }) => (
        <TableCollumn hasError={!!contatosError[index]?.email}>
          <span>{value.toString().toLowerCase()}</span>
          {contatosError[index]?.email && <ToolTip>{contatosError[index]?.email}</ToolTip>}
        </TableCollumn>
      )
    },
    {
      Header: 'Status',
      accessor: 'status',
      minWidth: 20,
      // eslint-disable-next-line react/display-name
      Cell: ({ value }) => {
        return <TableCenterContent><StatusText status={value}>{capitalize(value)}</StatusText></TableCenterContent>
      }
    },
    {
      Header: 'Fiscal',
      accessor: 'fiscal',
      minWidth: 20,
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
      minWidth: 20,
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
      minWidth: 20,
      Cell: ({ value }) => {
        if (value === 's') {
          return <TableCenterContent><FaCheck /></TableCenterContent>
        } else {
          return ''
        }
      }
    },
    {
      Header: 'Telefones',
      minWidth: 25,
      // eslint-disable-next-line react/display-name
      Cell: ({ original, index }) => {
        return (
          <Actions>
            <ButtonTable type="button" typeButton='primary' onClick={() => handleAdicionarContatoOnClick(index)}>Adicionar</ButtonTable>
          </Actions>
        )
      }
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
    },
    {
      expander: true,
      Header: () => <strong>Detalhes</strong>,
      width: 70,
      Expander: ({ isExpanded, ...rest }) => {
        // test your condition for Sub-Component here
        // I am using the presence of no comments
        if (rest?.original?.telefones?.length === 0) {
          return null
        } else {
          return (
            <div>
              {isExpanded
                ? <ButtonTable type="button" typeButton="primary">Ocultar</ButtonTable>
                : <ButtonTable type="button" typeButton="primary">Exibir</ButtonTable>
              }
            </div>
          )
        }
      }

    }

  ], [contatosError, handleAdicionarContatoOnClick])

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

  const handleModalTelefoneOnSave = useCallback(() => {
    const oldContato = contatos[contatoIndexSelected]

    const newContato = produce(oldContato, draftState => {
      draftState?.telefones?.push(telefone as Telefone)
    })

    setContatos(oldContatos => {
      const newContatos = produce(oldContatos, draftState => { draftState[contatoIndexSelected] = newContato as Contato })

      const newCliente = produce(cliente, draftState => {
        draftState.contatos = newContatos
      })

      setCliente(newCliente)

      return newContatos as unknown as Contato[]
    })

    resetTelefone()
  }, [cliente, contatoIndexSelected, contatos, resetTelefone, setCliente, telefone])

  const handleNovoContatoOnClick = () => {
    setShowModalContato(true)
    setClienteError({})
  }

  return (
    <>
      <Container>
        <Header>
          {/* <div>
            <Input type='text' startIcon={FaSearch} onChange={(e) => setSearchValue(e.currentTarget.value)}/>
          </div> */}
          <div>
            <Button mode="primary"startIcon={FaUser} type="button" onClick={handleNovoContatoOnClick}>Novo contato</Button>
          </div>
        </Header>

        <Content error={!!clienteError.contatos} indexesHasError={Object.keys(contatosError)}>
          <ReactTable
            columns={columns}
            data={contatos}
            pageSize={rowsPerPage}
            page={currentPage}
            pages={contatos?.length && Math.ceil(contatos?.length / rowsPerPage)}
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
            SubComponent={({ original }) => {
              const telefones = original?.telefones as Telefone []
              return (
                <ListaTelefones>
                  <ul>
                    { telefones?.map((telefone, index) => (
                      <li key={index}>
                        {telefone.whatsapp === 's' ? <FaWhatsapp color={theme.colors.sucess}/> : <FaPhone color={theme.colors.primary}/> }
                        {`(${telefone.ddd}) ${telefone.numero}`}
                      </li>
                    ))}
                  </ul>
                </ListaTelefones>
              )
            }}
          />

          { !!clienteError.contatos && <Error><ToolTip>{clienteError.contatos}</ToolTip></Error> }
        </Content>

      </Container>
      { showModalContato && <Modal
        title="Cadastro de contato"
        close={() => setShowModalContato(false)}
        onSave={handleModalCadastroOnSave}
        showButtonSave
        buttonSaveText="Adicionar"
      >
        <CadastroContato/>
      </Modal> }

      {showModalTelefone && <Modal
        title="Cadastro de telefone"
        close={() => setShowModalTelefone(false)}
        onSave={handleModalTelefoneOnSave}
        showButtonSave
      >
        <CadastroTelefone/>
      </Modal>}
    </>
  )
}
