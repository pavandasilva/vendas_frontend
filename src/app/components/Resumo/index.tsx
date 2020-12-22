import React from 'react'
import { Cliente } from '../../../domain/clientes/models'

import { Container } from './styles'

interface ResumoProps {
  cliente: Cliente
}

export const Resumo = ({ cliente }: ResumoProps) => {
  return <Container>Resumo</Container>
}
