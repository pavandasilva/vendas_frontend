import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Contato, Telefone } from '../../../../../../domain/clientes/models'

interface TableTelefonesProps {
  contato: Contato
}

export const TableTelefones = ({ contato }: TableTelefonesProps) => {
  const [telefones, setTelefones] = useState([] as Telefone [])

  useEffect(() => {
    if (contato?.telefones?.length) {
      setTelefones(contato.telefones)
    }
  }, [contato])

  const handleOnClickNovoTelefone = () => {
    setTelefones(telefones => {
      const emptyTelefone: Telefone = {
        ddd: '',
        e_whatsapp: false,
        numero: '',
        ramal: ''
      }

      const newTelefones = [...telefones, emptyTelefone]
      return newTelefones
    })
  }

  return (
    <>
      <button onClick={handleOnClickNovoTelefone} >Novo</button>
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
          { telefones?.length ? telefones.map((telefone, index) =>
            (
              <tr key={index.toString()}>
                <td>{telefone.ddd}</td>
                <td>{ telefone.numero}</td>
                <td>{telefone.ramal}</td>
                <td>{telefone.e_whatsapp ? 'Sim' : 'Não'}</td>
              </tr>
            )) : <h3>Nenhum telefone cadastrado</h3>
          }
        </tbody>
      </Table>
    </>
  )
}
