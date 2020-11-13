import React from 'react'
import { Cliente } from '../../../domain/clientes/models/cliente'

interface AtendimentoProps {
  cliente: Cliente
}

export const Atendimento = ({ cliente }: AtendimentoProps) => {
  return (
    <>
      <h1>{cliente.razao_social}</h1>
      <h1>{cliente.cidade}</h1>
      <h1>{cliente.status}</h1>
    </>
  )
}

export default Atendimento
