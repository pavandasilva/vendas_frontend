import capitalize from 'capitalize-pt-br'
import React, { useEffect, useState, useContext } from 'react'
import { Table } from 'react-bootstrap'
import { makeTrazerClientesFidelizados } from '../../../domain/clientes/factories/makeTrazerClientesFidelizados'
import { Cliente } from '../../../domain/clientes/models/cliente'
import { UsuarioContext, TabsContext } from '../../context'

const trazerClientesFidelizados = makeTrazerClientesFidelizados()

export const Clientes = () => {
  const [clientesFidelizados, setClientesFidelizados] = useState([] as Cliente[])
  const { usuario } = useContext(UsuarioContext)
  const { addTab } = useContext(TabsContext)

  useEffect(() => {
    async function fetch () {
      const response = await trazerClientesFidelizados.execute(
        usuario?.funcionario_id as unknown as number,
        usuario?.token as string,
        50,
        0,
        ''
      )

      setClientesFidelizados(response?.data as Cliente[])
    }

    fetch()
  }, [usuario])

  const handleAtenderOnClick = (cliente: Cliente) => {
    if (!cliente?.id) {
      return
    }

    addTab({
      index: cliente.id as number,
      title: `${cliente.id} - ${cliente.nome_fantasia}`
    })
  }

  return (
    <div className="card">
      <div className="card-body">
        <h2>Clientes</h2>
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
      </div>
    </div>
  )
}
