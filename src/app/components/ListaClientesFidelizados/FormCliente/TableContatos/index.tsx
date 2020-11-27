import React, { useState } from 'react'
import { Table, Form } from 'react-bootstrap'
import { Contato, Cliente } from '../../../../../domain/clientes/models'
import { TableTelefones } from './TableTelefones'

interface TableContatosProps {
  cliente: Cliente
}

export const TableContatos = ({ cliente }: TableContatosProps) => {
  const [contatoSelecionado, setContatoSelecionado] = useState({} as Contato)

  return (
    <>
      <TableTelefones contato={contatoSelecionado}/>
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-Mail</th>
            <th>Status</th>
            <th></th>
            <th className="text-center">Comercial</th>
            <th className="text-center">Fiscal</th>
            <th className="text-center">Financeiro</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Daniel</td>
            <td>daniel@gmail.com</td>
            <td>ATIVO</td>
            <td>
              <Form.Check
                type="checkbox"
                id=""
                name=""
                value=""
              />
            </td>
            <td className="text-center align-middle">
              <Form.Check
                type="checkbox"
                id=""
                name=""
                value=""
              />
            </td>
            <td className="text-center align-middle">
              <Form.Check
                type="checkbox"
                id=""
                name=""
                value=""
              />
            </td>
            <td className="text-center align-middle">
              <Form.Check
                type="checkbox"
                id=""
                name=""
                value=""
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </>

  )
}
