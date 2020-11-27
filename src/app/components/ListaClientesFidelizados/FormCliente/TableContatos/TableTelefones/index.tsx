import React from 'react'
import { Table } from 'react-bootstrap'
import { Contato } from '../../../../../../domain/clientes/models'

interface TableTelefonesProps {
  contato: Contato
}

export const TableTelefones = ({ contato }: TableTelefonesProps) => {
  return (
    <>
      <button>Novo</button>
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>DDD</th>
            <th>Telefone</th>
            <th>Ramal</th>
            <th className="text-center">WhatsApp</th>
          </tr>
        </thead>
        <tbody>
          { contato?.telefones?.map((telefone, index) =>
            <tr key={index.toString()}>
              <td>{telefone.ddd}</td>
              <td>{ telefone.numero}</td>
              <td>{telefone.ramal}</td>
              <td>{telefone.e_whatsapp}</td>
            </tr>)
          }

          {/* { contato?.telefones?.map(telefone =>
            (
              <tr>
                <td>{telefone.ddd}</td>
                <td>{ telefone.numero}</td>
                <td>{telefone.ramal}</td>
                <td>{telefone.e_whatsapp}</td>
              </tr>
            )
          } */}
        </tbody>
      </Table>
    </>
  )
}
