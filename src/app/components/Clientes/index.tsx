import capitalize from 'capitalize-pt-br'
import React, { ChangeEvent, useEffect, useState, useMemo, useCallback } from 'react'
import { Table, Pagination } from 'react-bootstrap'
import { makeTrazerClientesFidelizados } from '../../../domain/clientes/factories/makeTrazerClientesFidelizados'
import { Cliente } from '../../../domain/clientes/models/cliente'
import { useUsuario, useTabs } from '../../hooks'
import { Atendimento } from '../Atendimento'
import { InputSuggestions } from '../InputSuggestions'

const trazerClientesFidelizados = makeTrazerClientesFidelizados()

export const Clientes = () => {
  const [clientesFidelizados, setClientesFidelizados] = useState([] as Cliente[])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [numberRows, setNumberRows] = useState(0)
  const [loading, setLoading] = useState(false)
  const perPage = useMemo(() => 10, [])
  const { data } = useUsuario()
  const { addTab } = useTabs()

  useEffect(() => {
    async function fetch () {
      setLoading(true)

      const response = await trazerClientesFidelizados.execute(
        data?.funcionario_id as unknown as number,
        data?.token as string,
        perPage,
        (currentPage - 1) * perPage,
        search
      )

      setNumberRows(response.metadata.count)
      setClientesFidelizados(response?.data as Cliente[])
      setLoading(false)
    }

    fetch()
  }, [currentPage, data, perPage, search])

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

  const searchOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    setCurrentPage(1)
  }, [])

  const handlePaginationOnClick = useCallback((page: number) => {
    if (page < 1 || page > Math.ceil(numberRows / perPage)) {
      return
    }

    setCurrentPage(page)
  }, [numberRows, perPage])

  const getSuggestions = (value: string): string[] => {
    return [
      'kacel',
      'Guilherme'
    ]
  }

  return (
    <div className="card">
      <div className="card-body">
        <h2>Clientes</h2>
        <InputSuggestions onChange={searchOnChange} getSuggestions={getSuggestions} placeHolder='Filtrar clientes' />

        { loading ? <h1>loading...</h1> : (
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
                { clientesFidelizados?.map(cliente => (
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
              numberRows > perPage && (
                <Pagination>
                  <Pagination.First onClick={() => handlePaginationOnClick(1)}/>
                  <Pagination.Prev onClick={() => handlePaginationOnClick(currentPage - 1)}/>

                  { Array.apply(0, Array(Math.ceil(numberRows / perPage))).map((_, i) =>
                    <Pagination.Item
                      active={currentPage === i + 1}
                      onClick={() => handlePaginationOnClick(i + 1)}
                      key={i.toString()}>
                      {i + 1}
                    </Pagination.Item>
                  )}
                  <Pagination.Next onClick={() => handlePaginationOnClick(currentPage + 1)}/>
                  <Pagination.Last onClick={() => handlePaginationOnClick(Math.ceil(numberRows / perPage))}/>
                </Pagination>
              )
            }
          </>

        )}

      </div>
    </div>
  )
}
