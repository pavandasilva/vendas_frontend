import React, { useEffect, useState, useContext } from 'react'
import { Table } from 'react-bootstrap'
import { makeTrazerClientesFidelizados } from '../../../domain/clientes/factories/makeTrazerClientesFidelizados'
import { Cliente } from '../../../domain/clientes/models/cliente'
import { UsuarioContext } from '../../context'
import { Layout } from '../Layout'

const trazerClientesFidelizados = makeTrazerClientesFidelizados()

export const DashBoard: React.FC = () => {
  const [clientesFidelizados, setClientesFidelizados] = useState([] as Cliente[])
  const { usuario } = useContext(UsuarioContext)

  useEffect(() => {
    async function fetch () {
      const response = await trazerClientesFidelizados.execute(usuario?.funcionario_id as unknown as number, usuario?.token as string, 50, 0, '')
      setClientesFidelizados(response?.data as Cliente[])
    }

    fetch()
  }, [usuario])

  return (
    <Layout title="Dashboard">
      <div id="container" className="container-fluid">
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
                    <td>{cliente.id}</td>
                    <td>{cliente.razao_social}</td>
                    <td>{cliente.uf}</td>
                    <td>{cliente.cidade}</td>
                    <td>Editar Atender</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  )
}
