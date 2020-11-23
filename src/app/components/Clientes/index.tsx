import capitalize from 'capitalize-pt-br'
import React, { useState, useMemo, useCallback } from 'react'
import { Table, Pagination } from 'react-bootstrap'
import Autosuggest from 'react-autosuggest'
import { Cliente } from '../../../domain/clientes/models/cliente'
import { Atendimento } from '../Atendimento'
import { makeTrazerSugestoesClientesFidelizados } from '../../../domain/funcionarios/factories/makeTrazerSugestoesClientesFidelizados'
import { getLastWord } from '../../../helpers'
import useClientesFidelizados from '../../hooks/useClientesFidelizados'
import { useTabs, useUsuario } from '../../hooks/contexts'

const perPage = 10
interface SuggestionsFetchRequestedParams {
  value: string
}

const trazerSuggestoesClientesFidelizados = makeTrazerSugestoesClientesFidelizados()

export const Clientes = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [suggestions, setSuggestions] = useState([] as string[])
  const [value, setValue] = useState('')
  const { data: userData } = useUsuario()
  const { addTab } = useTabs()

  const { data: clientesFidelizados } = useClientesFidelizados({
    currentPage,
    perPage,
    search
  })

  const getSuggestionValue = useCallback((suggestion: string) => {
    const newValue = value.replace(getLastWord(value) as string, suggestion)
    return newValue
  }, [value])

  const renderSuggestion = useCallback((suggestion: string) => (
    <div>
      { suggestion }
    </div>
  ), [])

  const onSuggestionsFetchRequested = useCallback(async ({ value }: SuggestionsFetchRequestedParams) => {
    const suggestions = await trazerSuggestoesClientesFidelizados.execute({
      filter: getLastWord(value),
      token: userData?.token
    })

    setSuggestions(suggestions)
  }, [userData])

  const onSuggestionsClearRequested = useCallback(() => {
    setSuggestions([])
  }, [])

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, { newValue }) => {
    if (!event.target.value) {
      setSearch(newValue)
    }

    setValue(newValue)
  }, [])

  const onKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearch(value)
    }
  }, [value])

  const inputProps = useMemo(() => ({
    placeholder: 'Filtrar clientes',
    value,
    onChange,
    onKeyPress
  }), [onChange, onKeyPress, value])

  const handleAtenderOnClick = useCallback((cliente: Cliente) => {
    if (!cliente?.id) {
      return
    }

    addTab({
      index: cliente.id as number,
      title: `${cliente.id} - ${cliente.nome_fantasia}`,
      content: <Atendimento cliente={cliente}/>
    })
  }, [addTab])

  const handlePaginationOnClick = useCallback((page: number) => {
    if (!clientesFidelizados?.metadata?.count) {
      return
    }

    if (page < 1 || page > Math.ceil(clientesFidelizados.metadata.count / perPage)) {
      return
    }

    setCurrentPage(page)
  }, [clientesFidelizados])

  return (
    <div className="card">
      <div className="card-body">

        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />

        { !clientesFidelizados?.data ? <h1>loading...</h1> : (
          <>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Razão</th>
                  <th>UF</th>
                  <th>Cidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                { clientesFidelizados?.data?.map(cliente => (
                  <tr key={cliente?.id?.toString()}>
                    <td>{cliente?.id}</td>
                    <td>{capitalize(cliente?.razao_social as string)}</td>
                    <td>{cliente?.uf?.toUpperCase()}</td>
                    <td>{capitalize(cliente?.cidade as string)}</td>
                    <td><button onClick={() => handleAtenderOnClick(cliente)}>Atender</button></td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {
              clientesFidelizados && clientesFidelizados.metadata?.count > perPage && (
                <Pagination>
                  <Pagination.First onClick={() => handlePaginationOnClick(1)}/>
                  <Pagination.Prev onClick={() => handlePaginationOnClick(currentPage - 1)}/>

                  { Array.apply(0, Array(Math.ceil(clientesFidelizados.metadata.count / perPage))).map((_, i) =>
                    <Pagination.Item
                      active={currentPage === i + 1}
                      onClick={() => handlePaginationOnClick(i + 1)}
                      key={i.toString()}>
                      {i + 1}
                    </Pagination.Item>
                  )}
                  <Pagination.Next onClick={() => handlePaginationOnClick(currentPage + 1)}/>
                  <Pagination.Last onClick={() => handlePaginationOnClick(Math.ceil(clientesFidelizados.metadata.count / perPage))}/>
                </Pagination>
              )
            }
          </>
        )}
      </div>
    </div>
  )
}
